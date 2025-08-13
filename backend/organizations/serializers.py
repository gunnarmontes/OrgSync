from rest_framework import serializers
from .models import Organization
from django.contrib.auth.hashers import make_password, check_password

class OrganizationRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Organization
        fields = ['name', 'email', 'password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Organization.objects.create(**validated_data)


class OrganizationLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            org = Organization.objects.get(email=data['email'])
        except Organization.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not check_password(data['password'], org.password):
            raise serializers.ValidationError("Invalid email or password")

        data['organization'] = org
        return data
