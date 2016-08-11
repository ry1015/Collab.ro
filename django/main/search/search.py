from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from main.serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer, TrackCommentSerializer
from main.models import SocialNetwork, ContactInformation, Music, TrackComment, Project
import json
from startup.settings import MEDIA_ROOT
import os
import pprint
import re

''' MUST FIND THE FOLLOWING:
    1. Project Name
    2. Artist Name
    3. Category
    4. Genre
    5. Track Title
'''
# Get user input results
@api_view(['GET'])
def get_user_input_results(request, format=None):
    data = request.GET.get("input")
    terms = normalize_query(data)


    return Response(terms, status=status.HTTP_200_OK)


# Splits the query string in invidual keywords, getting rid of unecessary spaces
# and grouping quoted words together.
# Example:
# >>> normalize_query('  some random  words "with   quotes  " and   spaces')
# ['some', 'random', 'words', 'with quotes', 'and', 'spaces']
def normalize_query(query_string,
                findterms=re.compile(r'"([^"]+)"|(\S+)').findall,
                normspace=re.compile(r'\s{2,}').sub):

    return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]

# Get all projects by a given user
# _user, user
def getProjectsByUser(_user):
    projects = []
    try:
        user = User.objects.get(username=_user)
    except:
        return None

    try:
        projects = Projects.objects.filter(userID=user)
    except:
        return None

    return projects

def getProjectsByTitle(_title):
    projects = Projects.objects.filter(name=_title)
    return projects