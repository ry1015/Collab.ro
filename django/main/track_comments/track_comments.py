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

# Gets all track comments
@api_view(['GET'])
def get_track_comments(request, format=None):
    print ("------------------------------------------------------------")
    print ("START GET TRACK COMMENTS")
    selected_track = request.GET.get("filename")

    track_num, username, track_name = selected_track.split("_")
    comments = []

    # Get User
    try:
        user = User.objects.get(username=username)
    except:
        Response("User Does Not Exist", status=status.HTTP_400_BAD_REQUEST)

    # Get Music
    try:
        music = Music.objects.get(userID=user, filename=selected_track)
    except:
        Response("No Music Exists.", status=status.HTTP_400_BAD_REQUEST)

    # Get Track Comments
    try:
<<<<<<< HEAD
        comments = TrackComment.objects.filter(musicID=music).order_by('timestamp')
    except:
        Response("No Track Comments.", status=status.HTTP_400_BAD_REQUEST)

    print("---------------------------------")
    print(comments)
=======
        comments = TrackComment.objects.filter(musicID=music).order_by("-timestamp")
    except:
        Response("No Track Comments.", status=status.HTTP_400_BAD_REQUEST)

    # print ("COMMENTS")
    # print (comments)
>>>>>>> e6f743199f6a781d63e463d2b251302e1f8c6e0c
    data = []
    if (len(comments) > 0):
        # Grab all parents
        
        for comment in comments:
<<<<<<< HEAD
            tmp = {}
            tmp["comment"] = comment.comments
            tmp["recipient"] = UserSerializer(comment.recipient).data
            tmp["sender"] = UserSerializer(comment.sender).data
            tmp["timestamp"] = comment.timestamp
            data.append(tmp)
=======
            parent = {}
            if(comment.comment_parent_id == None):
                parent = TrackCommentSerializer(comment).data
                parent["id"] = comment.id
                parent["child"] = []
                data.append(parent)

        for parent in data:
            for comment in comments:
                if (comment.comment_parent_id == parent["id"]):
                    parent["child"].append(TrackCommentSerializer(comment).data)
>>>>>>> e6f743199f6a781d63e463d2b251302e1f8c6e0c
    else:
        print ("NO COMMENTS")
    data.append({"filename": selected_track})
    pprint.pprint(data)
    print ("END GET TRACK COMMENTS")
    print ("------------------------------------------------------------")
    return Response(data, status=status.HTTP_200_OK)