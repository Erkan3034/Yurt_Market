from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.exceptions import ValidationError
from core.utils.logging import get_logger

from .services import PaymentService

logger = get_logger(__name__)


class PaymentWebhookView(APIView):
    """
    Webhook endpoint for payment providers (Stripe, Dummy, etc.).
    Processes payment events and activates subscriptions.
    """

    permission_classes = [permissions.AllowAny]

    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        """
        Receive and process payment provider webhooks.
        Expects the payload format of the configured payment provider (dummy, Stripe, etc).
        """
        event_data = request.data

        try:
            payment_service = PaymentService()
            result = payment_service.handle_webhook_event(event_data)

            if result.get("status") == "processed":
                return Response(result, status=status.HTTP_200_OK)
            elif result.get("status") == "failed":
                return Response(result, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Ignored or received events
                return Response(result, status=status.HTTP_200_OK)

        except ValidationError as exc:
            logger.error("payment.webhook_validation_error", error=str(exc), event_data=event_data)
            return Response({"status": "error", "message": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            logger.exception("payment.webhook_error", error=str(exc), event_data=event_data)
            return Response(
                {"status": "error", "message": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

