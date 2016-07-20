from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation
import json
from startup.settings import MEDIA_ROOT
import os

@api_view(['GET'])
def get_user_tracks(request, format=None):
    data = {}
    data["tracks"] = []
    for file in os.listdir(MEDIA_ROOT):
        if "admin" in file:
            data["tracks"].append(file)
    
    return Response(data, status=status.HTTP_200_OK)