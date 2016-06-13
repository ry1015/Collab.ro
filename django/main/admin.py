from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation

# Register your models here.
models = {Music, Account, UserProfile, UserCategory, SocialNetwork, ContactInformation}
admin.site.register(models)