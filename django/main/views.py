from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .serializer import UserSerializer, UserProfileSerializer, ContactInformationSerializer
from .models import UserProfile, UserCategory, SocialNetwork, ContactInformation, Project
from .models import UserProfilePhoto
from main.py.csrfUtil import process_token
import json

# Create your views here.
# Redirects to index page
@ensure_csrf_cookie
def index(request):
    # print(request.session.get('member_id'))
    if(request.session.get('member_id') != None):
        user_id = request.session.get('member_id')
        try:
            user = User.objects.get(pk=user_id)
        except:
            return render(request, 'html/index.html')
    return render(request, 'html/index.html')

@api_view(['GET'])
def session(request, format=None):
    print ("----------------------------------------------------")
    print ("SESSION CALLED")

    print ("MEMBER ID:",request.session.get('member_id'))
    data = {}
    if (request.session.get('member_id')):
        try:
            user = User.objects.get(pk=request.session.get('member_id'))
            data = get_user_data(user.username)
        except:
            Response (None, status=status.HTTP_200_OK)
        print (data)
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(data, status=status.HTTP_200_OK)

# Redirects to signup page
def signup(request):
    return render_to_response('html/signup.html')

# Add a social network
@api_view(['POST'])
def add_social_network(request, format=None):
    try:
        body = process_token(request)
    except:
        return Response("Unauthorized: Invalid token", status=status.HTTP_401_UNAUTHORIZED)
        
    print ("Adding Social Network")
    data = json.loads(body.decode("utf-8"))
    print (data)
    username = data["username"]
    sn = "http://" + data["social_network"]

    try:
        user = User.objects.get(username=username)
    except:
        return Response("Add Social Network Error. Username Does Not Exist.")

    try:
        social_network = SocialNetwork.objects.get(userID=user, url=sn)
    except:
        try:
            new_social_network = SocialNetwork.objects.create(userID=user, url=sn)
        except:
            return Response("Social Network Error. Cannot Create New Social Network Site")
        data = get_user_data(username)
        return Response(data, status=status.HTTP_200_OK)
    
    if (social_network):
        return Response("Social Network Already Exists!", status=status.HTTP_400_BAD_REQUEST)

# Delete a social network
@api_view(['DELETE'])
def delete_social_network(request, format=None):
    try:
        body = process_token(request)
    except:
        return Response("Unauthorized: Invalid token", status=status.HTTP_401_UNAUTHORIZED)
    
    print ("Deleting Social Network")
    data = json.loads(body.decode("utf-8"))
    username = data["username"]    
    sn = data["social_network"]
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Delete Social Network Error. Username Does Not Exist.")

    try:
        social_network = SocialNetwork.objects.get(userID=user, url__contains=sn)
        social_network.delete()
    except:
        return Response("Could Not Delete Social Network.", status=status.HTTP_400_BAD_REQUEST)

    data = get_user_data(username)
    print (data)
    return Response(data, status=status.HTTP_200_OK)

# Get all user information i.e. profile, contact info, all possible user category
def get_user_data(username):
    user = User.objects.get(username=username.lower())

    # User Profile
    try:
        userprofile = UserProfile.objects.get(userID=user) # Get User
    except:
        return Response("Cannot Retrieve User Data. No User Profile.", status=status.HTTP_400_BAD_REQUEST)

    serializer = UserProfileSerializer(userprofile) # Serialize params
    user_profile = serializer.data
    
    categories = UserCategory.objects.all()
    if len(categories) != 0:
        try:
            user_profile["user_category"] = UserCategory.objects.get(id=user_profile["user_category"]).name
        except:
            user_profile["user_category"] = ""
    else:
        user_profile["user_category"] = ""

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
        return Response("Cannot Retrieve User Data. No Contact Information exists.", status=status.HTTP_400_BAD_REQUEST)
    contact_info_serializer = ContactInformationSerializer(contact_info)

    # Sending a list of categories
    categories = []
    for obj in UserCategory.objects.all():
        categories.append(obj.name)
    
    # User Projects
    print ("-------------------------------------")
    print ("GETTING PROJECTS")
    projects = []
    user_projects = Project.objects.filter(userID=user)
    print(user_projects)
    print ("-------------------------------------")
    for proj in user_projects:
        projects.append(proj.name)

    # User Profile Photos
    print ("-------------------------------------")
    print ("GETTING PROJECTS")
    photos = []
    user_photos = UserProfilePhoto.objects.filter(userID=user).order_by('-selected')
    print (user_photos)
    for photo in user_photos:
        tmp = {}
        print (photo.filename)
        tmp["filename"] = str(photo.filename)
        tmp["selected"] = photo.selected
        photos.append(tmp)
    user_profile["photos"] = photos
    print ("-------------------------------------")
    data={
        "contact_info": contact_info_serializer.data,
        "profile": user_profile,
        "user": UserSerializer(user).data,
        "categories": categories,
        "projects": projects
    }

    return data

# Logs in a user
@api_view(['GET', 'POST'])
def login_user(request, format=None):
    if request.method == "POST":
        print ("INSIDE LOGIN!")
        username = request.POST.get("username").lower()
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            print("User is valid, active and authenticated")
            login(request, user)
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
            if (userprofile.user_category == None):
                user_profile["user_category"] = ""
            else:
                user_profile["user_category"] = userprofile.user_category.name

            # User Contact Info
            try:
                contact_info = ContactInformation.objects.get(userID=user)
            except:
                return Response("No Contact Information exists.", status=status.HTTP_400_BAD_REQUEST)
            contact_info_serializer = ContactInformationSerializer(contact_info)

            # Sending a list of categories
            categories = []
            for obj in UserCategory.objects.all():
                categories.append(obj.name)

            data = get_user_data(username)
            request.session['member_id'] = user.id
            request.session.set_expiry(300)
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            # the authentication system was unable to verify the username and password
            print("The username and password were incorrect.")

    return Response("Login Failed.", status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request, format=None):
    try:
        process_token(request)
    except:
        return Response("Unauthorized: Invalid token", status=status.HTTP_401_UNAUTHORIZED)
    logout(request)
    request.session.flush()
    data = {}
    return Response(data, status.HTTP_200_OK)

# Signs up a user
@api_view(['GET', 'POST'])
def signup_user(request, format=None):
    try:
        print ("Checking username")
        user = User.objects.get(username=request.POST.get("username").lower())
        if (user):
            return Response("Username exists.", status=status.HTTP_400_BAD_REQUEST)
    except:
        try:
            print ("Checking email")
            user = User.objects.get(email=request.POST.get("email").lower())
            if (user):
                return Response("Email exists.", status=status.HTTP_400_BAD_REQUEST)
        except:
            try:
                user = User.objects.create_user(request.POST.get("username").lower(), email=request.POST.get("email").lower(), password=request.POST.get("password"))
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

                data = get_user_data(user.username)
                return Response(data, status=status.HTTP_201_CREATED)
            except:
                return Response("Could not create User.", status=status.HTTP_400_BAD_REQUEST)
    
    if (user):
        return Response("Username or exists.", status=status.HTTP_400_BAD_REQUEST)

# Updates a user profile
@api_view(['GET', 'POST'])
def update_profile(request, format=None):
    if request.method == "POST":
        try:
            body = process_token(request)
        except:
            return Response("Unauthorized: Invalid token", status=status.HTTP_401_UNAUTHORIZED)
    
    print ("Updating Profile")
    data = json.loads(body.decode("utf-8"))
    username = data["username"]
    user_info = data["user"]
    profile = data["profile"]
    contact_info = data["contact_info"]

    try:
        user = User.objects.get(username=username)
    except:
        return Response("User Does Not Exist.", status=status.HTTP_400_BAD_REQUEST)

    # Updating User Email and Password
    if (user_info["email"]):
        # Check if email already exists
        try:
            temp_user = User.objects.get(email=user_info["email"].lower())
            if (temp_user):
                return Response("Email already exists.", status=status.HTTP_400_BAD_REQUEST)
        except:
            print ("Updating Email")
            user.email = user_info["email"].lower()
            user.save()
    
    if (user_info["password"]):
        print ("Updating Password")
        user.set_password(user_info["password"])
        user.save()

    # Updating User Contact Info
    try:
        contact_info_serializer = ContactInformationSerializer(data=contact_info)
    except:
        print ("SOMETHING WENT WORNG WITH CONTACT INFO SERIALIZER")
        return Response("Contact Info Serializer Error.", status=status.HTTP_400_BAD_REQUEST)

    if contact_info_serializer.is_valid():
        print ("VALID CONTACT INFO")
        try:
            user_contact_info = ContactInformation.objects.get(userID=user)
            if (contact_info["address"]):
                user_contact_info.address = contact_info["address"]
            if (contact_info["phone_number"]):
                user_contact_info.phone_number = contact_info["phone_number"]
            user_contact_info.save()
        except:
            return Response("Contact Info Does Not Exist.", status=status.HTTP_400_BAD_REQUEST)
    else:
        print ("NOT VALID CONTACT INFO")
        return Response("Contact Info Not Valid.", status=status.HTTP_400_BAD_REQUEST)
    

    # Updating User Profile
    try:
        if (profile["user_category"] != ""):
            profile["user_category"] = UserCategory.objects.get(name=profile["user_category"]).id
        print (profile)
        userprofile_serializer = UserProfileSerializer(data=profile)
    except:
        print ("SOMETHING WENT WORNG WITH USER PROFILE SERIALIZER")
        return Response("User Profile Serializer Error.", status=status.HTTP_400_BAD_REQUEST)

    if userprofile_serializer.is_valid(raise_exception=True):
        print ("USER PROFILE VALID")
        try:
            userprofile = UserProfile.objects.get(userID=user)
            if (profile["biography"]):
                userprofile.biography = profile["biography"]
                userprofile.save()
            if (profile["user_category"]):
                try:
                    userprofile.user_category = UserCategory.objects.get(id=profile["user_category"])
                except:
                    print ("ERROR SAVING USER CATEGORY")
                userprofile.save()
        except:
            return Response("User Profile Does Not Exist.", status=status.HTTP_400_BAD_REQUEST)
    else:
        print ("NOT VALID USER PROFILE")
        return Response("User Profile Serializer Error.", status=status.HTTP_400_BAD_REQUEST)

    data = get_user_data(username)
    return Response(data, status=status.HTTP_201_CREATED)

