from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer, ProjectSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project
import json

@api_view(['POST'])
def add_project(request, format=None):
    print ("Adding Project")
    print (request.body)
    data = json.loads(request.body.decode("utf-8"))
    print (data)
    username = data["username"]
    project_name = data["project_name"]
    
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Add Project Error. Username Does Not Exist.")
    
    try:
        project = Project.objects.get(userID=user, name=project_name)
    except:
        try:
            new_project = Project.objects.create(userID=user, name=project_name)
        except:
            return Response("Project Error. Cannot Create New Project")
        
        data = new_project.id
        return Response(data, status=status.HTTP_200_OK)
    
    if (project):
        return Response("Project Already Exists!", status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_projects(request, format=None):
    print ("------------------------------------------------------------")
    print ("START GET PROJECTS")
    data = json.loads(request.body.decode("utf-8"))
    username = data["username"]
    
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Get Projects Error. Username Does Not Exist.")
    
    projects = Project.objects.filter(userID=user).order_by('-id')
    if(len(projects) > 0):
        data = []
        for project in projects:
            data.append({project.id, project.name})
    else:
        print ("NO PROJECTS")
    print(data)
    print ("END GET PROJECTS")
    print ("------------------------------------------------------------")
    return Response(data, status=status.HTTP_200_OK)
    
    