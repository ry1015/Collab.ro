from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment

# Register your models here.
models = {Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation, TrackComment}
admin.site.register(models)