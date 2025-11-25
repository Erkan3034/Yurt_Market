from django.conf import settings
from django.http import HttpResponseForbidden


class AdminIPRestrictionMiddleware:
    """
    Restrict access to /admin/ based on ADMIN_ALLOWED_IPS.
    If list is empty, middleware does nothing.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        self.allowed_ips = set(getattr(settings, "ADMIN_ALLOWED_IPS", []))

    def __call__(self, request):
        if self.allowed_ips and request.path.startswith("/admin/"):
            remote_ip = request.META.get("REMOTE_ADDR")
            if remote_ip not in self.allowed_ips:
                return HttpResponseForbidden("Admin access restricted.")
        return self.get_response(request)

