from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Organization


class OrganizationJWTAuthentication(JWTAuthentication):
    """
    Reads `org_id` from the JWT and resolves the corresponding Organization.
    Falls back to the default user binding if `org_id` isn't present.
    """
    def authenticate(self, request):
        result = super().authenticate(request)
        if result is None:
            return None

        user, validated_token = result
        org_id = validated_token.get("org_id")

        if org_id is not None:
            try:
                org = Organization.objects.get(id=org_id)
                return (org, validated_token)
            except Organization.DoesNotExist:
                return None

        return (user, validated_token) if user else None
