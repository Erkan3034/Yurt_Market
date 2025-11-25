from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    name = "modules.notifications"

    def ready(self):
        from core.events import event_dispatcher
        from core.events.types import (
            OrderCreatedEvent,
            ProductOutOfStockEvent,
            SubscriptionActivatedEvent,
        )

        from .services import SMTPNotificationService

        service = SMTPNotificationService()
        event_dispatcher.subscribe(OrderCreatedEvent.name, service.handle_order_created)
        event_dispatcher.subscribe(ProductOutOfStockEvent.name, service.handle_product_out_of_stock)
        event_dispatcher.subscribe(
            SubscriptionActivatedEvent.name, service.handle_subscription_activated
        )

