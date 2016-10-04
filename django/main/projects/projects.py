from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project, Stem, Track
import json

@api_view(['POST'])
def add_project(request, format=None):
    print ("Adding Project")
    print (request.POST.get("description"))
    # print (request.body)
    # data = json.loads(request.body.decode("utf-8"))
    # print (data)
    # username = data["username"]
    # project_name = data["project_name"]
    username = request.POST.get("username")
    project_name = request.POST.get("project_name")
    genre = request.POST.get("genre")
    track_status = request.POST.get("track_status")
    track_name = request.POST.get("track_name")
    track_filename = request.FILES.get("track_filename")
    stem_name = request.POST.get("stem_name")
    category = request.POST.get("category")
    stem_status = request.POST.get("stem_status")
    stem_filename = request.FILES.get("stem_filename")
    description = request.POST.get("description")

    try:
        user = User.objects.get(username=username)
    except:
        return Response("Add Project Error. Username Does Not Exist.")
    
    try:
        project = Project.objects.get(userID=user, name=project_name)
    except:
        try:
            new_project = Project.objects.create(userID=user, name=project_name, description=description)
        except:
            return Response("Project Error. Cannot Create New Project")
        try:
            new_stem = Stem.objects.create(userID=user, projectID=new_project, title=stem_name, category=category, status=stem_status, filename=stem_filename)
        except:
            return Response("Upload Stem Error. Cannot upload stem.", status=status.HTTP_400_BAD_REQUEST)
        new_stem.save()
        try:
            new_track = Track.objects.create(userID=user, projectID=new_project, title=track_name, genre=genre, status=track_status, filename=track_filename)
        except:
            return Response("Upload Track Error. Cannot upload track.", status=status.HTTP_400_BAD_REQUEST)
        new_track.save()
        data = {'id': new_project.id}
        return Response(data, status=status.HTTP_200_OK)
    
    if (project):
        return Response("Project Already Exists!", status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_project_details(request, format=None):
    print ("------------------------------------------------------------")
    print ("START GET PROJECT DETAILS")
    print (request.POST)

    print ("------------------------------------------------------------")

    username = request.POST.get("username")
    project_id = request.POST.get("project_id")

    try:
        user = User.objects.get(username=username)
    except:
        return Response("User Does Not Exist", status=status.HTTP_400_BAD_REQUEST)
    try:
        project = Project.objects.get(id=project_id)
    except:
        return Response("Project Does Not Exist", status.status.HTTP_400_BAD_REQUEST)

    data = {}
    data["project_name"] = project.name
    data["project_status"] = project.status
    data["project_desc"] = project.description
    data["tracks"] = []
    data["tracks"] = getProjectTracks(project)
    data["stems"] = []
    data["stems"] = getProjectStems(project)

    return Response(data, status=status.HTTP_200_OK)

# Gets all stems associated with user and user's project
# user, the user
# proj, the project
# list_stems, all stems associated with the project
def getProjectStems(proj):
    stems = Stem.objects.filter(projectID=proj.id)
    list_stems = []
    for stem in stems:
        tmp = {}
        tmp["title"] = stem.title
        tmp["category"] = stem.category
        tmp["status"] = stem.status
        tmp["filename"] = str(stem.filename)[2:]
        tmp["owner"] = stem.userID.username
        tmp["timestamp"] = stem.upload_date
        list_stems.append(tmp)
    return list_stems

# Gets all tracks associated with user and user's project
# user, the user
# proj, the project
# list_tracks, all tracks associated with the project
def getProjectTracks(proj):
    tracks = Track.objects.filter(projectID=proj.id)
    list_tracks = []
    for track in tracks:
        tmp = {}
        tmp["id"] = track.id
        tmp["title"] = track.title
        tmp["genre"] = track.genre
        tmp["status"] = track.status
        print (track.filename)
        tmp["filename"] = str(track.filename).split("/")[3]
        tmp["owner"] = track.userID.username
        tmp["timestamp"] = track.upload_date
        list_tracks.append(tmp)
    return list_tracks

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
            data.append({"id":project.id, "name":project.name})
    else:
        print ("NO PROJECTS")
    print(data)
    print ("END GET PROJECTS")
    print ("------------------------------------------------------------")
    return Response(data, status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
def delete_project(request, format=None):
    print ("------------------------------------------------------------")
    print ("START DELETE PROJECT")
    data = json.loads(request.body.decode("utf-8"))
    id = data["id"]
    
    try:
        project = Project.objects.get(id=id)
        project.delete()
    except:
        return Response("Could Not Delete Project.", status=status.HTTP_400_BAD_REQUEST)
    
    
    print ("END DELETE PROJECT")
    print ("------------------------------------------------------------")
    return Response(data, status=status.HTTP_200_OK)
    