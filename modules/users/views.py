from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)


class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class RefreshTokenView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]


class ToggleStoreStatusView(APIView):
    """Satıcı için mağaza aç/kapat endpoint'i"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != "seller":
            return Response({"detail": "Bu işlem sadece satıcılar için geçerlidir."}, status=status.HTTP_403_FORBIDDEN)
        
        if not hasattr(request.user, "seller_profile"):
            return Response({"detail": "Satıcı profili bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
        
        profile = request.user.seller_profile
        profile.store_is_open = not profile.store_is_open
        profile.save(update_fields=["store_is_open"])
        
        return Response({
            "store_is_open": profile.store_is_open,
            "message": "Mağaza açıldı" if profile.store_is_open else "Mağaza kapatıldı"
        })

