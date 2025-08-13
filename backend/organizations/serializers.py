from rest_framework import serializers
from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    """
    Read-only serializer for returning org data
    """
    class Meta:
        model = Organization
        fields = ["id", "name", "email", "slug", "created_at", "updated_at"]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]


class OrganizationRegisterSerializer(serializers.ModelSerializer):
    """
    sign-up serializer.

    - Checks that name/email are not already used 
    """
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Organization
        fields = ["name", "email", "password"]

    def validate_email(self, value: str) -> str:
        email = value.strip().lower()

        if Organization.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("That email is already registered.")
        return email

    def validate_name(self, value: str) -> str:
        name = value.strip()
        if not name:
            raise serializers.ValidationError("Organization name cannot be empty.")
        if Organization.objects.filter(name=name).exists():
            raise serializers.ValidationError("That organization name is already taken.")
        return name

    def create(self, validated_data):
        """
        use create_user so the password is hashed.
        """
        return Organization.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"],
        )


from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    """
    serializer for both read/write.
    """
    class Meta:
        model = Event
        fields = ["id", "description", "date", "time", "location", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        # Attach the organization from the authenticated user
        org = self.context["request"].user
        return Event.objects.create(organization=org, **validated_data)

    def validate_description(self, value: str) -> str:
        v = value.strip()
        if not v:
            raise serializers.ValidationError("Description cannot be empty.")
        return v
    


from rest_framework import serializers
from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    """
    Serializer for listing, creating, and updating Members.
    """
    class Meta:
        model = Member
        fields = ["id", "name", "email", "joined_at"]
        read_only_fields = ["id", "joined_at"]

    def create(self, validated_data):
        org = self.context["request"].user
        return Member.objects.create(organization=org, **validated_data)

    def validate_name(self, value: str) -> str:
        v = value.strip()
        if not v:
            raise serializers.ValidationError("Name cannot be empty.")
        return v

    def validate_email(self, value: str) -> str:
        email = value.strip().lower()
        org = self.context["request"].user
        if Member.objects.filter(organization=org, email__iexact=email).exists():
            raise serializers.ValidationError("That email is already a member of this organization.")
        return email

