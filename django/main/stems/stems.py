from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project, Stem
import json

@api_view(['POST'])
def upload_stem(request, format=None):
    print("Processing Stem")
    username = request.POST.get("username")
    proj_id = request.POST.get("proj_id")
    stem_name = request.POST.get("stem_name")
    category = request.POST.get("category")
    stem_status = request.POST.get("stem_status")
    filename = request.FILES.get("filename")
	
    print(username)
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Upload Stem Error. Username Does Not Exist.")
    try:
        project = Project.objects.get(userID=user, id=proj_id)
        print(project)
    except:
        return Response("Upload Stem Error. Project Does Not Exist.")
    try:
        new_stem = Stem.objects.create(userID=user, projectID=project, title=stem_name, category=category, status=stem_status, filename=filename)
    except:
        return Response("Upload Stem Error. Cannot upload stem.", status=status.HTTP_400_BAD_REQUEST)
    new_stem.save()
	
    data = project.name
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_project_stems(request, format=None):
    print("Retrieving Project Stems")
    proj_id = request.POST.get("proj_id")

    stems = Stem.objects.filter(projectID=proj_id).order_by('-upload_date')
    if(len(stems) > 0):
        data = []
        for stem in stems:
            data.append({"proj_id": proj_id, "stem_id": stem.id, "title": stem.title})
    else:
        print("NO STEMS FOUND")
        return Response(None, status=status.HTTP_204_NO_CONTENT)

    return Response(data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_stem(request, format=None):
    print("DELETING STEM")
    stem_id = request.POST.get("stem_id")

    try:
        stem = Stem.objects.get(id=stem_id)
        stem.delete()
    except:
        return Response("Could Not Delete Stem.", status=status.HTTP_400_BAD_REQUEST)

		
    print ("END DELETE STEM")
    print ("------------------------------------------------------------")
    data = []
    data.append(stem_id)
    return Response(data, status=status.HTTP_200_OK)
	
