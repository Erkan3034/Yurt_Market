from dataclasses import dataclass
from typing import Any, Dict, Literal

from django.conf import settings

from core.events import SubscriptionActivatedEvent, event_dispatcher
from core.exceptions import ValidationError
from core.utils.logging import get_logger

from .adapters import DummyPaymentAdapter, PaymentError, StripeAdapter

logger = get_logger(__name__)


@dataclass
class PaymentService:
    provider: Literal["stripe", "dummy"] = "dummy"

    def _adapter(self):
        if self.provider == "stripe":
            return StripeAdapter(
                api_key=getattr(settings, "STRIPE_SECRET_KEY", ""),
                success_url=settings.PAYMENT_SUCCESS_URL,
                cancel_url=settings.PAYMENT_CANCEL_URL,
            )
        return DummyPaymentAdapter(
            success_url=settings.PAYMENT_SUCCESS_URL,
            cancel_url=settings.PAYMENT_CANCEL_URL,
        )

    def create_checkout(self, amount: float):
        adapter = self._adapter()
        try:
            return adapter.create_checkout_session(amount=amount)
        except PaymentError as exc:
            raise PaymentError(f"Payment provider misconfigured: {exc}") from exc

    def handle_webhook_event(self, event_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process payment webhook events from providers.
        Returns dict with status and any relevant data.
        """
        provider = getattr(settings, "PAYMENT_PROVIDER", "dummy")
        event_type = event_data.get("type") or event_data.get("event")

        logger.info(
            "payment.webhook_processing",
            provider=provider,
            event_type=event_type,
            event_data=event_data,
        )

        if provider == "stripe":
            return self._handle_stripe_event(event_data)
        elif provider == "dummy":
            return self._handle_dummy_event(event_data)
        else:
            logger.warning("payment.unknown_provider", provider=provider)
            return {"status": "ignored", "reason": f"Unknown provider: {provider}"}

    def _handle_stripe_event(self, event_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle Stripe webhook events."""
        event_type = event_data.get("type", "")

        # Stripe checkout.session.completed event
        if event_type == "checkout.session.completed":
            session = event_data.get("data", {}).get("object", {})
            session_id = session.get("id")
            customer_email = session.get("customer_email") or session.get("customer_details", {}).get("email")
            amount_total = session.get("amount_total", 0) / 100  # Stripe uses cents

            logger.info(
                "payment.stripe_checkout_completed",
                session_id=session_id,
                customer_email=customer_email,
                amount=amount_total,
            )

            # Find subscription by session_id (you'd store this in metadata)
            # For now, we'll activate the most recent pending subscription for this customer
            subscription_id = self._activate_subscription_by_payment(
                session_id=session_id, customer_email=customer_email, amount=amount_total
            )

            return {
                "status": "processed",
                "event": "checkout.session.completed",
                "subscription_id": subscription_id,
            }

        # Stripe payment_intent.succeeded event
        elif event_type == "payment_intent.succeeded":
            payment_intent = event_data.get("data", {}).get("object", {})
            payment_id = payment_intent.get("id")
            amount = payment_intent.get("amount", 0) / 100

            logger.info("payment.stripe_payment_succeeded", payment_id=payment_id, amount=amount)

            return {
                "status": "processed",
                "event": "payment_intent.succeeded",
                "payment_id": payment_id,
            }

        else:
            logger.info("payment.stripe_event_ignored", event_type=event_type)
            return {"status": "ignored", "event_type": event_type}

    def _handle_dummy_event(self, event_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle dummy/test payment events."""
        event_type = event_data.get("event", "")

        if event_type == "payment_succeeded":
            data = event_data.get("data", {})
            subscription_id = data.get("subscription_id")
            session_id = data.get("session_id")

            if subscription_id:
                self._activate_subscription_by_id(subscription_id)
                logger.info("payment.dummy_payment_succeeded", subscription_id=subscription_id, session_id=session_id)
                return {
                    "status": "processed",
                    "event": "payment_succeeded",
                    "subscription_id": subscription_id,
                }

        elif event_type == "payment_failed":
            logger.warning("payment.dummy_payment_failed", event_data=event_data)
            return {"status": "failed", "event": "payment_failed"}

        return {"status": "received", "event": event_type}

    def _activate_subscription_by_payment(
        self, session_id: str, customer_email: str = None, amount: float = None
    ) -> int | None:
        """
        Activate subscription based on payment session ID.
        Finds subscription by payment_session_id.
        """
        from modules.subscription.models import SellerSubscription
        from modules.subscription.services import SubscriptionService

        # Find subscription by payment session ID
        subscription = (
            SellerSubscription.objects.filter(payment_session_id=session_id, is_active=False)
            .select_related("plan", "seller")
            .first()
        )

        # Fallback: if not found by session_id, try most recent pending subscription
        if not subscription:
            subscription = (
                SellerSubscription.objects.filter(is_active=False)
                .select_related("plan", "seller")
                .order_by("-created_at")
                .first()
            )

        if not subscription:
            logger.warning("payment.subscription_not_found", session_id=session_id)
            return None

        # Verify amount matches (optional security check)
        if amount and float(subscription.plan.price) != amount:
            logger.warning(
                "payment.amount_mismatch",
                expected=float(subscription.plan.price),
                received=amount,
                subscription_id=subscription.id,
            )

        # Activate subscription
        subscription.is_active = True
        subscription.save(update_fields=["is_active"])

        # Update usage tracking
        service = SubscriptionService()
        service.usage_repo.update_or_create(
            seller=subscription.seller,
            defaults={"product_slots": subscription.plan.max_products},
        )

        logger.info(
            "payment.subscription_activated",
            subscription_id=subscription.id,
            seller_id=subscription.seller_id,
            plan_id=subscription.plan_id,
            session_id=session_id,
        )

        event_dispatcher.dispatch(
            SubscriptionActivatedEvent(
                payload={
                    "seller_id": subscription.seller_id,
                    "plan_id": subscription.plan_id,
                    "subscription_id": subscription.id,
                }
            )
        )

        return subscription.id

    def _activate_subscription_by_id(self, subscription_id: int) -> None:
        """Activate subscription by ID (for dummy/test events)."""
        from modules.subscription.models import SellerSubscription
        from modules.subscription.services import SubscriptionService

        try:
            subscription = SellerSubscription.objects.select_related("plan", "seller").get(id=subscription_id)
            subscription.is_active = True
            subscription.save(update_fields=["is_active"])

            service = SubscriptionService()
            service.usage_repo.update_or_create(
                seller=subscription.seller,
                defaults={"product_slots": subscription.plan.max_products},
            )

            logger.info(
                "payment.subscription_activated_by_id",
                subscription_id=subscription.id,
                seller_id=subscription.seller_id,
            )

            event_dispatcher.dispatch(
                SubscriptionActivatedEvent(
                    payload={
                        "seller_id": subscription.seller_id,
                        "plan_id": subscription.plan_id,
                        "subscription_id": subscription.id,
                    }
                )
            )
        except SellerSubscription.DoesNotExist:
            logger.error("payment.subscription_not_found_by_id", subscription_id=subscription_id)
            raise ValidationError(f"Subscription {subscription_id} not found")

