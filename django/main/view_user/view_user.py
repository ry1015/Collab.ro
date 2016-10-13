from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from main.models import Project
from .view_user_serializer import ProjectSerializer
# Gets user project
@api_view(['POST'])
def get_user_public_project(request, format=None):
    print("------------------------------")
    print("START GET USER PROJECTS")
    data = {}
    username = request.POST.get("username")
    project_title = request.POST.get("project_title")
    viewer = request.POST.get("viewer")
    
    try:
        user = User.objects.get(username=username)
    except:
        return Response("Username not found.", status=status.HTTP_400_BAD_REQUEST)

    try:
        project = Project.objects.get(name=project_title, userID=user, status="public")
    except:
        return Response("Project not found.", status=status.HTTP_400_BAD_REQUEST)
    serializer = ProjectSerializer(project)
    print(serializer.data)
    print("END GET USER PROJECTS")
    print("------------------------------")
    return Response(data, status=status.HTTP_200_OK)