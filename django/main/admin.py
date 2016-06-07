from django.contrib import admin
from . models import Music, Account, UserProfile, UserCategory, SocialNetwork

# Register your models here.
models = {Music, Account, UserProfile, UserCategory, SocialNetwork}
admin.site.register(models)