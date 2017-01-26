from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project, Stem, Track
from main.models import StemComment
from django.template.context_processors import csrf
from django.http import HttpResponse
import json
import os
import pprint
from django.conf import settings
from wsgiref.util import FileWrapper
import os
import base64

@api_view(['POST'])
def add_project(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")

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
                if(track_filename is not None):
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
                    return Response("Missing track filename. Cannot Create New Project Track.", status=status.HTTP_400_BAD_REQUEST)
                head, tail = os.path.split(new_track.filename.path)
                os.rename(new_track.filename.path, head + "\\" + str(new_track.id) + "_" + tail)
                new_track.filename.name = "tracks\\" + str(new_track.projectID.id) + "\\" + str(new_track.userID.id) + "\\" + str(new_track.id) + "_" + tail
                new_track.save()
            else:
                if(track_filename is not None):
                    return Response("Missing track title. Cannot Create New Project Track.", status=status.HTTP_400_BAD_REQUEST)

            if(stem_title != ""):
                if(stem_filename is not None):
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
                    return Response("Missing stem filename. Cannot Create New Project Stem.", status=status.HTTP_400_BAD_REQUEST)
            else:
                if(stem_filename is not None):
                    return Response("Missing stem title. Cannot Create New Project Stem.", status.status.HTTP_400_BAD_REQUEST)
   
            return Response({}, status=status.HTTP_200_OK)

        if(project):
            return Response("Project Already Exists!", status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response("Missing Project Name. Cannot Create New Project.", status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def get_project_details(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.", status=status.HTTP_401_UNAUTHORIZED)

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
    data["project_id"] = project.id
    data["project_name"] = project.name
    data["project_status"] = project.status
    data["project_desc"] = project.description
    data["tracks"] = get_project_tracks(project)
    data["stems"] = get_project_stems(project)
    data["stem_comments_count"] = get_stem_comments_count(project)
    return Response(data, status=status.HTTP_200_OK)

def get_stem_comments_count(proj):
    count = 0
    stem_list = Stem.objects.filter(projectID=proj)
    for stem in stem_list:
        comments = StemComment.objects.filter(stemID=stem)
        count += len(comments)
    return count


def get_project_stems(proj):
    """
    Gets all stems associated with user and user's project
    user, the user
    proj, the project
    list_stems, all stems associated with the project
    """
    stems = Stem.objects.filter(projectID=proj.id)
    list_stems = []
    for stem in stems:
        tmp = {}
        tmp["title"] = stem.title
        tmp["category"] = stem.category
        tmp["status"] = stem.status
        if (stem.filename):
            tmp["filename"] = str(stem.filename).split("/")[3]
        else:
            print ('FILENAME DOES NOT EXISTS')
            tmp["filename"] = ''
        tmp["owner"] = stem.userID.username
        tmp["timestamp"] = stem.upload_date
        list_stems.append(tmp)
    return list_stems


def get_project_tracks(proj):
    """
    Gets all tracks associated with user and user's project
    user, the user
    proj, the project
    list_tracks, all tracks associated with the project
    """
    tracks = Track.objects.filter(projectID=proj.id)
    list_tracks = []
    for track in tracks:
        tmp = {}
        tmp["id"] = track.id
        tmp["title"] = track.title
        tmp["genre"] = track.genre
        tmp["status"] = track.status
        trackpath = str(track.filename).split("/")
        tmp["filename"] = trackpath[len(trackpath) - 1]
        tmp["owner"] = track.userID.username
        tmp["timestamp"] = track.upload_date
        list_tracks.append(tmp)
    return list_tracks

@api_view(['POST'])
@ensure_csrf_cookie
def get_projects(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.", status=status.HTTP_401_UNAUTHORIZED)

    data = []
    username = request.POST.get('username')
    
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
        
    for proj in data:
        stems = Stem.objects.filter(projectID=proj['id'])
        proj['stems_count'] = len(stems)
    
    return Response(data, status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
def delete_project(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")
    
    data = json.loads(body.decode("utf-8"))
    id = data["id"]
    
    try:
        project = Project.objects.get(id=id)
        project.delete()
    except:
        return Response("Could Not Delete Project.", status=status.HTTP_400_BAD_REQUEST)

    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def change_project_status(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")
    
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


@api_view(['POST'])
def get_recent_updates(request, format=None):
    """
    Get recent project updates
    This includes stem comments and uploaded stems
    """
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")

    project_id = request.POST.get("project_id")

    try:
        project = Project.objects.get(id=project_id)
    except:
        return Response("Project Does Not Exist.", status=status.HTTP_400_BAD_REQUEST)

    stems = Stem.objects.filter(projectID=project_id).order_by("-upload_date")
    data = []
    stem_comments_list = []
    for i in range(0, len(stems)):
        tmp = {}
        tmp["stem_title"] = stems[i].title
        tmp["stem_category"] = stems[i].category
        tmp["stem_uploaded_by"]  = stems[i].userID.username
        tmp["stem_filename"] = str(stems[i].filename).replace("stems/", "")
        tmp["date"] = stems[i].upload_date
        data.append(tmp)

        stem_comments = StemComment.objects.filter(stemID=stems[i].id).order_by('-timestamp')[:10]
        for comment in stem_comments:
            tmp_comment = {}
            tmp_comment["stem_comment_sender"] = comment.sender.username
            tmp_comment["stem_title"] = comment.stemID.title
            tmp_comment["stem_comment"] = comment.comment
            tmp_comment["date"] = comment.timestamp
            data.append(tmp_comment)
    data = sorted(data, key=lambda x: x['date'], reverse=True)

    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_stem_file(request, format=None):
    """                                                                         
    Send a file through Django without loading the whole file into              
    memory at once. The FileWrapper will turn the file object into an           
    iterator for chunks of 8KB.                                                 
    """
    if request.user.is_authenticated:
        filename = settings.BASE_DIR + "/main/media/stems/"+request.POST.get("filename")
        f = open(filename, "rb")
        response = HttpResponse()
        response.write(f.read())
        response['Content-Type'] = 'audio/mpeg'
        response['Content-Length'] = os.path.getsize(filename)
        response['Content-Disposition'] = 'attachment; filename=%s' % request.POST.get("filename")
        return response
    else:
        request.session.flush()
        return Response("User not Authenticated.")
    