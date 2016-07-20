from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation
import json

@api_view(['GET'])
def get_user_tracks(request, format=None):
    return Response("Test: Get User Tracks!", status=status.HTTP_400_BAD_REQUEST)