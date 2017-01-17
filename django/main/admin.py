from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment, Project, Track
from . models import UserProfilePhoto
from . models import Stem, StemComment
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
    StemComment,
    Track,
    UserProfilePhoto,
    }
    
admin.site.register(models)