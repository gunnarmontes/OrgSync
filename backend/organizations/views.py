from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import Organization
from .serializers import OrganizationRegisterSerializer, OrganizationLoginSerializer
from .utility_functions import OrganizationJWTAuthentication  # You'll define this separately

organization_auth = OrganizationJWTAuthentication()


class OrganizationRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OrganizationRegisterSerializer(data=request.data)
        if serializer.is_valid():
            org = serializer.save()
            tokens = organization_auth.generate_org_tokens(org)  # Generates access + refresh JWT
            return Response({
                "message": "Organization created",
                "organization": {
                    "id": org.id,
                    "name": org.name,
                    "email": org.email,
                    "slug": org.slug
                },
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizationLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OrganizationLoginSerializer(data=request.data)
        if serializer.is_valid():
            org = serializer.validated_data['organization']
            tokens = organization_auth.generate_org_tokens(org)
            return Response({
                "message": "Login successful",
                "organization": {
                    "id": org.id,
                    "name": org.name,
                    "email": org.email,
                    "slug": org.slug
                },
                "tokens": tokens
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
