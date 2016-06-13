from django.shortcuts import render, render_to_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer
from .models import UserProfile, UserCategory, SocialNetwork, ContactInformation
import json

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
            try:
                userprofile = UserProfile.objects.get(userID=user) # Get User
            except:
                return Response("No User Profile.", status=status.HTTP_400_BAD_REQUEST)

            serializer = UserProfileSerializer(userprofile) # Serialize params
            user_profile = serializer.data
            
            # Build user data (i.e. profile and contact info)
            social_network = SocialNetwork.objects.filter(userID=user.pk)
            social_network_links = []
            for obj in social_network:
                social_network_links.append(obj.url)
            user_profile["social_network"] = social_network_links

            # User Contact Info
            try:
                contact_info = ContactInformation.objects.get(userID=user)
            except:
                return Response("No Contact Information exists.", status=status.HTTP_400_BAD_REQUEST)
            contact_info_serializer = ContactInformationSerializer(contact_info)

            data={
                "contact_info": contact_info_serializer.data,
                "profile": user_profile,
                "user": UserSerializer(user).data
            }
            return Response(data, status=status.HTTP_201_CREATED)
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
    except:
        try:
            print ("Checking email")
            user = User.objects.get(email=request.POST.get("email"))
            if (user):
                return Response("Email exists.", status=status.HTTP_400_BAD_REQUEST)
        except:
            try:
                user = User.objects.create_user(request.POST.get("username"), email=request.POST.get("email"), password=request.POST.get("password"))
                print ("USER PK")
                print (user.pk)
                try:
                    profile = UserProfile.objects.create(userID=user)
                except:
                    print ("PROFILE COULD NOT BE CREATED.")
                    return Response("Could not create Profile.", status=status.HTTP_400_BAD_REQUEST)
                try:
                    contact_info = ContactInformation.objects.create(userID=user)
                except:
                    print ("CONTACT INFO COULD NOT BE CREATED.")
                    return Response("Could not create Contact Info.", status=status.HTTP_400_BAD_REQUEST)

                return Response("USERNAME and EMAIL UNIQUE!", status=status.HTTP_201_CREATED)
            except:
                return Response("Could not create User.", status=status.HTTP_400_BAD_REQUEST)
    
    if (user):
        return Response("Username or exists.", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def update_profile(request, format=None):
    print ("Updating Profile")
    print (request.POST)
    username = request.POST.get("username")
    print ("USERNAME: " + str(username))
    password = request.POST.get("password")
    email = request.POST.get("email")
    password_flag = False
    email_flag = False

    user = User.objects.get(username=username)
    if (email):
        # Check if email address already exists
        try:
            temp_user = User.objects.get(email=email)
            if (temp_user):
                return Response("Email already Exists!", status=status.HTTP_400_BAD_REQUEST)
        except:
            print ("NEW EMAIL")
            email_flag = True
            user.email = email
            user.save()

    if (password):
        print ("NEW PASSWORD!")
        password_flag = True
        user.set_password(password)
        user.save()
        serializer = UserSerializer(user)

    if (email_flag == True):
        serializer = UserSerializer(user)

    userprofile = UserProfile.objects.get(userID=user)
    userprofile_serializer = UserProfileSerializer(userprofile)

    data={"info": userprofile_serializer.data, "user": UserSerializer(user).data}

    if (password_flag == True and email_flag == True):
        return Response(data, status=status.HTTP_201_CREATED)
    elif (password_flag == True):
        return Response(data, status=status.HTTP_201_CREATED)
    elif (email_flag == True):
        serializer = UserSerializer(user)
        return Response(data, status=status.HTTP_201_CREATED)
    else:
        return Response("Could not update User Profile.", status=status.HTTP_400_BAD_REQUEST)
        