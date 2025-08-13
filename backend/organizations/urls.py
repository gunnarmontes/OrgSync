# urls.py
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", RegisterOrganizationView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", OrganizationDetailView.as_view(), name="organization_detail"),

    path("events/", EventListCreateView.as_view(), name="event_list_create"),
    path("events/<int:pk>/", EventDetailView.as_view(), name="event_detail"),


    path("members/", MemberListCreateView.as_view(), name="member_list_create"),
    path("members/<int:pk>/", MemberDetailView.as_view(), name="member_detail"),
]
