from rest_framework import serializers
from django.contrib.auth.models import User
from main.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('userID', 'name', 'status', 'description', 'timestamp')