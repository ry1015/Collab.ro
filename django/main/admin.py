from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project, Stem, Track

# Register your models here.
models = {Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project, Stem, Track}
admin.site.register(models)