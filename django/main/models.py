from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

class Project (models.Model):
    userID = models.ForeignKey(User)
    name = models.CharField(max_length=200)
    
    def __str__(self):
        preview = "(" + self.userID + ") " + self.name
        return preview


# Create your models here.
# Music table
class Music (models.Model):
    userID = models.ForeignKey(User)
    title = models.CharField(max_length=200)
    filename = models.CharField(max_length=200, blank=True)
    upload_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=7, default="public")

    def __str__(self):
        preview = "(" + self.artist_name + ") " + self.title
        return preview

# Account table
# May be deleted... Not sure
class Account (models.Model):
    account_type = models.CharField(max_length=100)

    def __str__(self):
        preview = self.account_type
        return preview

# Category of a user i.e. Vocalist, Producer
class UserCategory (models.Model):
    name = models.CharField(max_length=10, default="")
    
    def __str__(self):
        preview = self.name
        return preview

# User Contact Info
class ContactInformation (models.Model):
    userID = models.ForeignKey(User)
    address = models.CharField(max_length=200, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=16, blank=True, default="+19999999999") # validators should be a list

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + str(self.phone_number)
        return preview

# User Profile
class UserProfile (models.Model):
    userID = models.ForeignKey(User)
    biography = models.TextField(blank=True)
    user_category = models.ForeignKey(UserCategory, blank=True, null=True )

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + str(self.user_category)
        return preview

# User Social Networks
class SocialNetwork(models.Model):
    url = models.URLField(max_length=200, blank=True)
    userID = models.ForeignKey(User)

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + self.url
        return preview

class TrackComment(models.Model):
    musicID = models.ForeignKey(Music, blank=True, null=True)
    comments = models.TextField(blank=True)
    sender = models.ForeignKey(User, blank=True)
    recipient = models.ForeignKey(User, related_name='user_recipient',blank=True)

    def __str__(self):
        preview = "(" + str(self.musicID) + ")" + str(self.sender)
        return preview