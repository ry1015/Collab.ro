from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project, Stem

# Register your models here.
models = {Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project, Stem}
admin.site.register(models)