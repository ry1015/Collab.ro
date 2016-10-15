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
    username = request.POST.get("username")
    project_name = request.POST.get("project_name")
    project_status = request.POST.get("project_status")
    project_description = request.POST.get("project_description")
    track_title = request.POST.get("track_title")
    track_genre = request.POST.get("track_genre")
    track_status = request.POST.get("track_status")
    track_filename = request.FILES.get("track_filename")
    stem_title = request.POST.get("stem_title")
    stem_category = request.POST.get("stem_category")
    stem_status = request.POST.get("stem_status")
    stem_filename = request.FILES.get("stem_filename")
	
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Add Project Error. Username Does Not Exist.")

    if(project_name != ""):
        try:
            project = Project.objects.get(userID=user, name=project_name)
        except:
            if(project_status != ""):
                try:
                    new_project = Project.objects.create(userID=user, name=project_name, status=project_status, description=project_description)
                except:
                    return Response("Project Error. Cannot create new project.", status=status.HTTP_400_BAD_REQUEST)
                new_project.save()
            else:
                try:
                    new_project = Project.objects.create(userID=user, name=project_name, description=project_description)
                except:
                    return Response("Project Error. Cannot create new project.", status=status.HTTP_400_BAD_REQUEST)
                new_project.save()

            if(track_title != ""):
                if(track_filename != ""):
                    if(track_status != ""):					
                        try:
                            new_track = Track.objects.create(userID=user, projectID=new_project, title=track_title, genre=track_genre, status=track_status, filename=track_filename)
                        except:
                            return Response("Track Error. Cannot Create New Project Track.", status=status.HTTP_400_BAD_REQUEST)
                            new_track.save()
                    else:
                        try:
                            new_track = Track.objects.create(userID=user, projectID=new_project, title=track_title, genre=track_genre, filename=track_filename)
                        except:
                            return Response("Track Error. Cannot Create New Project Track.", status=status.HTTP_400_BAD_REQUEST)
                            new_track.save()
                else:
                    return Response("Missing track filename.", status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response("Missing track title.", status=status.HTTP_400_BAD_REQUEST)

            if(stem_title != ""):
                if(stem_filename != ""):
                    if(stem_status != ""):
                        try:
                            new_stem = Stem.objects.create(userID=user, projectID=new_project, title=stem_title, category=stem_category, status=stem_status, filename=stem_filename)
                        except:
                            return Response("Stem Error. Cannot Create New Project Stem.", status=status.HTTP_400_BAD_REQUEST)
                        new_stem.save()
                    else:
                        try:
                            new_stem = Stem.objects.create(userID=user, projectID=new_project, title=stem_title, category=stem_category, filename=stem_filename)
                        except:
                            return Response("Stem Error. Cannot Create New Project Stem.", status=status.HTTP_400_BAD_REQUEST)
                        new_stem.save()
                else:
                    return Response("Missing stem filename.", status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response("Missing stem title.", status=status.HTTP_400_BAD_REQUEST)

            return Response({}, status=status.HTTP_200_OK)

        if(project):
            return Response("Project Already Exists!", status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response("Missing Project Name.", status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_project_details(request, format=None):
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
    print(stems)
    for stem in stems:
        tmp = {}
        tmp["title"] = stem.title
        tmp["category"] = stem.category
        tmp["status"] = stem.status
        tmp["filename"] = str(stem.filename).split("/")[3]
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
            data.append({"id":project.id, "name":project.name, "status":project.status})
    else:
        print ("NO PROJECTS")
    return Response(data, status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
def delete_project(request, format=None):
    data = json.loads(request.body.decode("utf-8"))
    id = data["id"]
    
    try:
        project = Project.objects.get(id=id)
        project.delete()
    except:
        return Response("Could Not Delete Project.", status=status.HTTP_400_BAD_REQUEST)

    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def change_project_status(request, format=None):
    data = {}
    id = request.POST.get("projectID")
    try:
        project = Project.objects.get(id=id)
    except:
        return Response("Project Does Not Exist.", status=status.HTTP_400_BAD_REQUEST)
    
    if (project.status.upper() == "PUBLIC"):
        project.status = "private"
    else:
        project.status = "public"
    
    project.save()
    return Response(data, status=status.HTTP_200_OK)
