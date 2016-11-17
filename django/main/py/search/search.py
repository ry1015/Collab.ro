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
import operator
from django.db.models import Q
from functools import reduce


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
    print("------------------------------------------")
    print ("START USER INPUT RESULTS")
    results = {}

    data = request.GET.get("input")
    terms = normalize_query(data)
    user = getUserFromList(terms)
    user_search = userSearch(terms)

    if (user != None): # user found
        terms.remove(user[0])
        user = user[1]
        q = reduce(operator.and_, (Q(name__icontains = term) for term in terms), Q(userID=user))
    else:
        q = reduce(operator.and_, (Q(name__icontains = term) for term in terms))

    projects = []
    proj_list = Project.objects.filter(q)
    ids = []
    for proj in proj_list:
        if (proj.status == "public"):
            tmp = {}
            tmp["title"] = proj.name
            tmp["artist"] = proj.userID.username
            ids.append(proj.id)
            projects.append(tmp)

    if (user != None):
        q = reduce(operator.or_, (Q(name__icontains = term) for term in terms), Q(userID=user))
        print(q)
    else:
        q = reduce(operator.or_, (Q(name__icontains = term) for term in terms))

    other_projects = []
    or_proj_list = Project.objects.filter(q).exclude(id__in=ids)
    for proj in or_proj_list:
        if (proj.status == "public"):
            tmp = {}
            tmp["title"] = proj.name
            tmp["artist"] = proj.userID.username
            ids.append(proj.id)
            other_projects.append(tmp)

    results["exact_projects"] = projects
    results["other_projects"] = other_projects
    results["users"] = user_search

    print ("END USER INPUT RESULTS")
    print("------------------------------------------")
    return Response(results, status=status.HTTP_200_OK)


# Splits the query string in invidual keywords, getting rid of unecessary spaces
# and grouping quoted words together.
# Example:
# >>> normalize_query('  some random  words "with   quotes  " and   spaces')
# ['some', 'random', 'words', 'with quotes', 'and', 'spaces']
def normalize_query(query_string,
                findterms=re.compile(r'"([^"]+)"|(\S+)').findall,
                normspace=re.compile(r'\s{2,}').sub):

    return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]


# Get user from a list
# _list, a list of terms
def getUserFromList(_list):
    user = None
    for item in _list:
        try:
            user = User.objects.get(username=item.lower())
        except Exception:
            pass

        if (user != None):
            return [item, user]
    return None

def userSearch(_list):
    query = reduce(operator.or_, (Q(username__icontains = term) for term in _list))
    userSearchList = User.objects.filter(query)
    users = []
    for user in userSearchList:
        tmp = {}
        tmp["artist"] = user.username
        users.append(tmp)
    return users
