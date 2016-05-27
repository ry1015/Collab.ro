from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializer import UserSerializer

# Create your views here.
def index(request):
    return render_to_response('html/index.html')

def signup(request):
    return render_to_response('html/signup.html')
    
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

@api_view(['GET', 'POST'])
def signup_user(request, format=None):
    try:
        print ("Checking username")
        user = User.objects.get(username=request.POST.get("username"))
        if (user):
            return Response("Username exists.", status=status.HTTP_400_BAD_REQUEST)
        print(user)
        print("---------------------------------")
    except:
        try:
            print ("Checking email")
            user = User.objects.get(email=request.POST.get("email"))
            if (user):
                return Response("Email exists.", status=status.HTTP_400_BAD_REQUEST)
        except:
            try:
                user = User.objects.create_user(request.POST.get("username"), email=request.POST.get("email"), password=request.POST.get("password"))
                return Response("USERNAME and EMAIL UNIQUE!", status=status.HTTP_201_CREATED)
            except:
                return Response("Could not create User.", status=status.HTTP_400_BAD_REQUEST)
    
    if (user):
        return Response("Username or exists.", status=status.HTTP_400_BAD_REQUEST)
    
    
        