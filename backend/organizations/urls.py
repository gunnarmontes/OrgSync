# organizations/urls.py
from django.urls import path
from .views import OrganizationRegisterView, OrganizationLoginView

urlpatterns = [
    path("register/", OrganizationRegisterView.as_view(), name="org-register"),
    path("login/", OrganizationLoginView.as_view(), name="org-login"),
]
