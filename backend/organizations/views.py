from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Organization
from .serializers import OrganizationRegisterSerializer, OrganizationSerializer
from .jwt_issuance import OrgTokenObtainPairSerializer


class RegisterOrganizationView(generics.CreateAPIView):
    """
    POST /register
    Creates an Organization and returns org fields + JWT pair.
    """
    queryset = Organization.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = OrganizationRegisterSerializer

    def create(self, request, *args, **kwargs):
        write_serializer = self.get_serializer(data=request.data)
        write_serializer.is_valid(raise_exception=True)
        org = write_serializer.save()

        # Issue JWTs with org_id claim
        refresh = OrgTokenObtainPairSerializer.get_token(org)
        access = refresh.access_token

        data = OrganizationSerializer(org).data
        data.update({"refresh": str(refresh), "access": str(access)})
        headers = self.get_success_headers(write_serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)


class OrganizationDetailView(generics.RetrieveAPIView):
    """
    GET /me
    Returns the current Organization (from JWT).
    """
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


from rest_framework import generics, permissions
from .models import Event
from .serializers import EventSerializer


class EventListCreateView(generics.ListCreateAPIView):
    """
    GET  /orgs/events/   -> list events for current org
    POST /orgs/events/   -> create event for current org
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(organization=self.request.user).order_by("date", "time")



class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /orgs/events/<id>/
    PATCH  /orgs/events/<id>/
    PUT    /orgs/events/<id>/
    DELETE /orgs/events/<id>/
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(organization=self.request.user)
