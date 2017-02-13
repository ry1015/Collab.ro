from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Music, TrackComment, Project, Stem
from main.py.projects.projects import get_project_stems
import json

@api_view(['POST'])
def upload_stem(request, format=None):
    if request.user.is_authenticated:
        print("Processing Stem")
        print (request.FILES)
        print (request.POST)
        username = request.POST.get("uploaded_by")
        proj_id = request.POST.get("proj_id")
        stem_title = request.POST.get("stem_title")
        stem_file = request.FILES.get("filename")

        try:
            user = User.objects.get(username=username)
        except:
            return Response("User Does Not Exist", status = status.HTTP_400_BAD_REQUEST)
        try:
            proj = Project.objects.get(id=proj_id)
        except:
            return Response("Project Does Not Exist", status = status.HTTP_400_BAD_REQUEST)
        
        if (stem_title == ""):
            return Response("Enter Stem Title", status=status.HTTP_204_NO_CONTENT)
        if (stem_file == ""):
            return Response("Upload Stem File", status=status.HTTP_204_NO_CONTENT)

        try:
            new_stem = Stem.objects.create(userID=user, projectID=proj, title=stem_title, filename=stem_file, category="Test")
            new_stem.save()
            data = {}
            data["stems"] = get_project_stems(proj)
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response("Stem Cannot Be Saved", status = status.HTTP_400_BAD_REQUEST)
    else:
        request.session.flush()
        return Response("User not Authenticated.", status = status.HTTP_401_UNAUTHORIZED)

    

# @api_view(['POST'])
# def get_project_stems(request, format=None):
#     if request.user.is_authenticated:
#         pass
#     else:
#         request.session.flush()
#         return Response("User not Authenticated.")

#     print("Retrieving Project Stems")
#     proj_id = request.POST.get("proj_id")

#     stems = Stem.objects.filter(projectID=proj_id).order_by('-title', '-upload_date')
#     if(len(stems) > 0):
#         data = []
#         stem_title_found = []
#         for stem in stems:
#             if(stem.title not in stem_title_found):
#                 data.append({"proj_id": proj_id, "stem_user_id": str(stem.userID), "stem_id": stem.id, "title": stem.title})
#                 stem_title_found.append(stem.title)
#     else:
#         print("NO STEMS FOUND")
#         return Response(None, status=status.HTTP_204_NO_CONTENT)
		
#     return Response(data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_stem(request, format=None):
    if request.user.is_authenticated:
        pass
    else:
        request.session.flush()
        return Response("User not Authenticated.")

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
	
