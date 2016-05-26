from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .serializer import UserSerializer

# Create your views here.
def index(request):
    return render_to_response('html/index.html')

@api_view(['GET', 'POST'])
def login(request, format=None):
    if request.method == "GET":
        print ("INSIDE LOGIN!")
        username = request.GET.get("username")
        password = request.GET.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            print("User is valid, active and authenticated")
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # the authentication system was unable to verify the username and password
            print("The username and password were incorrect.")

    return Response("Login Failed.", status=status.HTTP_400_BAD_REQUEST)