from django.shortcuts import render, render_to_response
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project, Track
import json
import os


@api_view(['POST'])
def upload_track(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")

    print("Processing Track")
    username = request.POST.get("username")
    proj_id = request.POST.get("proj_id")
    track_title = request.POST.get("track_title")
    genre = request.POST.get("genre")
    track_status = request.POST.get("track_status")
    filename = request.FILES.get("filename")
    
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Upload Track Error. Username Does Not Exist.")
    try:
        project = Project.objects.get(userID=user, id=proj_id)
    except:
        return Response("Upload Track Error. Project Does Not Exist.")
    if(track_title != ""):
        if(filename is not None):
            if(track_status != ""):
                try:
                    new_track = Track.objects.create(userID=user, projectID=project, title=track_title, genre=genre, status=track_status, filename=filename)
                except:
                    return Response("Upload Track Error. Cannot upload track.", status=status.HTTP_400_BAD_REQUEST)
                new_track.save()
            else:
                try:
                    new_track = Track.objects.create(userID=user, projectID=project, title=track_title, genre=genre, filename=filename)
                except:
                    return Response("Upload Track Error. Cannot upload track.", status=status.HTTP_400_BAD_REQUEST)
                new_track.save()
        else:
            return Response("Missing track filename. Cannot create new track.", status=status.HTTP_400_BAD_REQUEST)
    else:
        if(filename is not None):
            return Response("Missing track title. Cannot create new track.", status=status.HTTP_400_BAD_REQUEST)
    
    
    head, tail = os.path.split(new_track.filename.path)
    print(head)
    print(tail)
    os.rename(new_track.filename.path, head + "\\" + str(new_track.id) + "_" + tail)
    new_track.filename.name = "tracks\\" + str(new_track.projectID.id) + "\\" + str(new_track.userID.id) + "\\" + str(new_track.id) + "_" + tail
    new_track.save()
    data = {} 
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_project_tracks(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")
    
    print("Retrieving Project Tracks")
    proj_id = request.POST.get("proj_id")
    
    tracks = Track.objects.filter(projectID=proj_id).order_by('-upload_date')
    if(len(tracks) > 0):
        data = []
        track_title_found = []
        for track in tracks:
            if(track.title not in track_title_found):
                data.append({"proj_id": proj_id, "track_user_id": str(track.userID), "track_id": track.id, "title":track.title})
                track_title_found.append(track.title)
    else:
        print ("NO TRACKS FOUND")
        return Response(None, status=status.HTTP_204_NO_CONTENT)
    
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_track(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")
    
    track_id = request.POST.get("track_id")
    
    track = Track.objects.filter(id=track_id)
    if(len(track) > 0):
        fileobject = track[0].filename
        filename = os.path.basename(fileobject.file.name)
        data = "media/tracks/"+ str(track[0].projectID.id) + "/" + str(track[0].userID.id) + "/" + filename;
        response = Response(data, status=status.HTTP_200_OK)
        return response
    else:
        print("NO TRACK FOUND")
        return Response(None, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_track(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")

    print("DELETING TRACK")
    track_id = request.POST.get("track_id")
    
    try:
        track = Track.objects.get(id=track_id)
        track.delete()
    except:
        return Response("Could Not Delete Track.", status=status.HTTP_400_BAD_REQUEST)
    
    
    print ("END DELETE TRACK")
    print ("------------------------------------------------------------")
    data = []
    data.append(track_id)
    return Response(data, status=status.HTTP_200_OK)