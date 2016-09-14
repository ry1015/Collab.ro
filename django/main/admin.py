from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project, Stem, Track
from . models import UserProfilePhoto

# Register your models here.
models = {
    Music, 
    Account, 
    UserProfile, 
    UserCategory, 
    SocialNetwork, 
    ContactInformation, 
    TrackComment, 
    Project, 
    Stem, 
    Track,
    UserProfilePhoto,
    }
    
admin.site.register(models)