from rest_framework import serializers
from django.contrib.auth.models import User
from . models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('userID', 'address', 'phone_number', 'biography', 'user_category')