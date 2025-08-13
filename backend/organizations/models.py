# models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.text import slugify
from django.utils import timezone


class OrganizationManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        org = self.model(email=email, name=name, **extra_fields)
        org.set_password(password)
        org.save(using=self._db)
        return org

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, name, password, **extra_fields)


class Organization(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = OrganizationManager()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_user_id(self):
        return self.id


from django.db import models
from django.utils import timezone
from .models import Organization  # if this line is already in this file, don't duplicate it


class Event(models.Model):
    """
    A calendar-like event owned by an Organization.
    """
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="events",
    )
    description = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()  # diagram shows String; TimeField is safer & simple
    location = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["date", "time"]

    def __str__(self) -> str:
        return f"{self.description} @ {self.date} {self.time}"
