from rest_framework import serializers
from django.contrib.auth.models import User
from main.models import Project, Track, Stem

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'status', 'description')

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('title', 'genre', 'status', 'upload_date')

class StemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stem
        fields = ('title', 'category', 'status', 'upload_date')