from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project, Track
import json

@api_view(['POST'])
def upload_track(request, format=None):
    print("Processing Track")
    username = request.POST.get("username")
    track_name = request.POST.get("track_name")
    genre = request.POST.get("genre")
    filename = request.FILES.get("filename")
    
    print(username)
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Upload Track Error. Username Does Not Exist.")
    try:
        project = Project.objects.get(userID=user, name="Test Project")
        print(project)
    except:
        return Response("Upload Track Error. Project Does Not Exist.")
    try:
        track = Track.objects.create(userID=user, projectID=project, title=track_name, genre=genre, filename=filename)
    except:
        return Response("Upload Track Error. Cannot upload track.", status=status.HTTP_400_BAD_REQUEST)
    track.save()
    return Response({}, status=status.HTTP_200_OK)