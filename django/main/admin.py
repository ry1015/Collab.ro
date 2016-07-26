from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project

# Register your models here.
models = {Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project}
admin.site.register(models)