from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Organization

class OrganizationJWTAuthentication(JWTAuthentication):

    def generate_org_tokens(org):
        refresh = RefreshToken()
        refresh["org_id"] = org.id 
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }
    
    def authenticate(self, request):
        result = super().authenticate(request)
        if result is None:
            return None

        validated_token = result[1]
        org_id = validated_token.get("org_id")
        try:
            org = Organization.objects.get(id=org_id)
        except Organization.DoesNotExist:
            return None

        return (org, validated_token)
