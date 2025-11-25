from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from core.events import BaseEvent
from core.utils.logging import get_logger
from modules.products.models import Product
from modules.subscription.models import SellerSubscription

User = get_user_model()
logger = get_logger(__name__)


class SMTPNotificationService:
    """Handles email notifications for order, stock and subscription events."""

    def _send_email(self, subject: str, body: str, recipient: str) -> None:
        if not recipient:
            logger.warning("notification.no_recipient", subject=subject)
            return
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [recipient], fail_silently=True)

    def handle_order_created(self, event: BaseEvent) -> None:
        seller_id = event.payload.get("seller_id")
        if not seller_id:
            return

        seller = (
            User.objects.select_related("seller_profile")
            .filter(id=seller_id)
            .first()
        )
        if not seller:
            return
        recipient = getattr(seller.seller_profile, "notification_email", None) or seller.email
        subject = "Yeni siparişiniz var"
        body = f"Sipariş #{event.payload.get('order_id')} oluşturuldu."
        self._send_email(subject, body, recipient)

    def handle_product_out_of_stock(self, event: BaseEvent) -> None:
        product_id = event.payload.get("product_id")
        if not product_id:
            return
        try:
            product = Product.objects.select_related("seller").get(id=product_id)
        except Product.DoesNotExist:
            logger.warning("notification.product_not_found", product_id=product_id)
            return

        seller = product.seller
        recipient = getattr(seller.seller_profile, "notification_email", None) or seller.email
        subject = "Ürününüz Tükendi"
        body = f"{product.name} isimli ürününüzün stoğu tükendi. Lütfen stoğu güncelleyin."
        self._send_email(subject, body, recipient)

    def handle_subscription_activated(self, event: BaseEvent) -> None:
        subscription_id = event.payload.get("subscription_id")
        seller_id = event.payload.get("seller_id")
        if not subscription_id or not seller_id:
            return
        try:
            subscription = SellerSubscription.objects.select_related("seller", "plan").get(id=subscription_id)
        except SellerSubscription.DoesNotExist:
            logger.warning("notification.subscription_not_found", subscription_id=subscription_id)
            return

        seller = subscription.seller
        recipient = getattr(seller.seller_profile, "notification_email", None) or seller.email
        subject = "Aboneliğiniz Aktif"
        body = (
            f"{subscription.plan.name} planınız aktif hale getirildi. "
            f"{subscription.expires_at:%d.%m.%Y} tarihine kadar {subscription.plan.max_products} ürün hakkınız bulunuyor."
        )
        self._send_email(subject, body, recipient)

