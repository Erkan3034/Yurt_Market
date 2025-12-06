from rest_framework import serializers

from .models import Order, OrderItem
from .services import OrderItemDTO, OrderService


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product_id", "product_name", "quantity", "unit_price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    payment_method_display = serializers.CharField(source="get_payment_method_display", read_only=True)
    delivery_type_display = serializers.CharField(source="get_delivery_type_display", read_only=True)
    customer_email = serializers.CharField(source="customer.email", read_only=True)
    customer_phone = serializers.CharField(source="customer.phone", read_only=True)
    customer_room = serializers.SerializerMethodField()
    seller_email = serializers.CharField(source="seller.email", read_only=True)
    seller_phone = serializers.SerializerMethodField()
    seller_room = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "total_amount",
            "notes",
            "created_at",
            "seller_id",
            "customer_id",
            "items",
            "payment_method",
            "payment_method_display",
            "delivery_type",
            "delivery_type_display",
            "delivery_address",
            "delivery_phone",
            "customer_email",
            "customer_phone",
            "customer_room",
            "seller_email",
            "seller_phone",
            "seller_room",
        ]

    def get_customer_room(self, obj):
        if obj.customer.room_number and obj.customer.block:
            return f"{obj.customer.block} Blok, {obj.customer.room_number} No"
        elif obj.customer.room_number:
            return f"{obj.customer.room_number} No"
        return ""

    def get_seller_phone(self, obj):
        if hasattr(obj.seller, "seller_profile"):
            return obj.seller.seller_profile.phone
        return obj.seller.phone or ""

    def get_seller_room(self, obj):
        if obj.seller.room_number and obj.seller.block:
            return f"{obj.seller.block} Blok, {obj.seller.room_number} No"
        elif obj.seller.room_number:
            return f"{obj.seller.room_number} No"
        return ""


class OrderCreateItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderCreateSerializer(serializers.Serializer):
    notes = serializers.CharField(required=False, allow_blank=True)
    items = OrderCreateItemSerializer(many=True)
    payment_method = serializers.ChoiceField(choices=Order.PaymentMethod.choices, default=Order.PaymentMethod.CASH_ON_DELIVERY, required=False)
    delivery_type = serializers.ChoiceField(choices=Order.DeliveryType.choices, default=Order.DeliveryType.CUSTOMER_PICKUP, required=False)
    delivery_address = serializers.CharField(required=True, help_text="Oda numarası ve blok bilgisi")
    delivery_phone = serializers.CharField(required=True, max_length=32)

    def create(self, validated_data):
        service = OrderService()
        dto_items = [OrderItemDTO(**item) for item in validated_data["items"]]
        return service.create_order(
            customer=self.context["request"].user,
            items=dto_items,
            notes=validated_data.get("notes", ""),
            payment_method=validated_data.get("payment_method", Order.PaymentMethod.CASH_ON_DELIVERY),
            delivery_type=validated_data.get("delivery_type", Order.DeliveryType.CUSTOMER_PICKUP),
            delivery_address=validated_data.get("delivery_address", ""),
            delivery_phone=validated_data.get("delivery_phone", ""),
        )


class OrderStatusSerializer(serializers.Serializer):
    note = serializers.CharField(required=False, allow_blank=True)

