# jwt_issuance.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class OrgTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customize JWT payload to include `org_id` for our Organization model.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["org_id"] = user.id
        return token


class OrgTokenObtainPairView(TokenObtainPairView):
    serializer_class = OrgTokenObtainPairSerializer
