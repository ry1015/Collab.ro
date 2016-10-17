from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from main.models import Project, Track, Stem
from .view_user_serializer import ProjectSerializer, TrackSerializer, StemSerializer
# Gets user project
@api_view(['POST'])
def get_user_public_project(request, format=None):
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
    
    track_objects = Track.objects.filter(projectID=project.id, status="public")
    tracks = []
    for track_obj in track_objects:
        tmp = TrackSerializer(track_obj).data
        tracks.append(tmp)

    stem_objects = Stem.objects.filter(projectID=project.id, status="public")
    stems = []
    for stem_obj in stem_objects:
        tmp = StemSerializer(stem_obj).data
        stems.append(tmp)

    data["project"] = ProjectSerializer(project).data
    data["tracks"] = tracks
    data["stems"] = stems

    return Response(data, status=status.HTTP_200_OK)