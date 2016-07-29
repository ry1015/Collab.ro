from rest_framework import serializers
from django.contrib.auth.models import User
from . models import UserProfile, ContactInformation, TrackComment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('biography', 'user_category')

class ContactInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInformation
        fields = ('address', 'phone_number')

class TrackCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackComment
        fields = ('sender', 'comment_parent_id', 'comments', 'timestamp')