from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment
import json
from startup.settings import MEDIA_ROOT
import os
import pprint

# Get user input results
@api_view(['GET'])
def get_user_input_results(request, format=None):
    data = request.GET.get("input")
    print (data)
    return Response("SUCCESS", status=status.HTTP_200_OK)