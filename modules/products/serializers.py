from rest_framework import serializers

from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields = ["id", "image", "created_at"]
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProductSerializer(serializers.ModelSerializer):
    stock_quantity = serializers.IntegerField(source="stock.quantity", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    seller_id = serializers.IntegerField(source="seller.id", read_only=True)
    seller_store_is_open = serializers.SerializerMethodField()
    seller_phone = serializers.SerializerMethodField()
    seller_room = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "is_active",
            "is_out_of_stock",
            "stock_quantity",
            "category_id",
            "category_name",
            "seller_id",
            "seller_store_is_open",
            "seller_phone",
            "seller_room",
            "images",
            "image_url",
        ]

    def get_image_url(self, obj):
        # Try to get first image from prefetched images or query
        first_image = None
        if hasattr(obj, '_prefetched_objects_cache') and 'images' in obj._prefetched_objects_cache:
            prefetched_images = obj._prefetched_objects_cache['images']
            if prefetched_images:
                first_image = prefetched_images[0]
        else:
            first_image = obj.images.first()
        
        if first_image and first_image.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(first_image.image.url)
            return first_image.image.url
        return None

    def get_seller_store_is_open(self, obj):
        if hasattr(obj.seller, "seller_profile"):
            return obj.seller.seller_profile.store_is_open
        return True

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


class ProductWriteSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    description = serializers.CharField(allow_blank=True, required=False)
    price = serializers.DecimalField(max_digits=8, decimal_places=2, required=False)
    category_id = serializers.IntegerField(required=False)
    stock_quantity = serializers.IntegerField(min_value=0, required=False)
    is_active = serializers.BooleanField(required=False)


