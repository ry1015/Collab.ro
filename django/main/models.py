from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.
# User Project
class Project (models.Model):
    userID = models.ForeignKey(User)
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=7, default="public")
    description = models.TextField(blank=True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + str(self.name)
        return preview

# Music table
class Music (models.Model):
    userID = models.ForeignKey(User)
    title = models.CharField(max_length=200)
    filename = models.CharField(max_length=200, blank=True)
    upload_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=7, default="public")

    def __str__(self):
        preview = "(" + self.userID.username + ") " + self.title
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
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=16, blank=True, default="+19999999999") # validators should be a list
    address = models.CharField(max_length=200, blank=True)

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + str(self.phone_number)
        return preview

# User Profile
class UserProfile (models.Model):
    userID = models.ForeignKey(User)
    user_category = models.ForeignKey(UserCategory, blank=True, null=True)
    biography = models.TextField(blank=True)

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + str(self.user_category)
        return preview

# User Social Networks
class SocialNetwork(models.Model):
    userID = models.ForeignKey(User)
    url = models.URLField(max_length=200, blank=True)

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + self.url
        return preview

# Track Comments
class TrackComment(models.Model):
    musicID = models.ForeignKey(Music)
    sender = models.ForeignKey(User)
    comment_parent_id = models.PositiveIntegerField(blank=True, null=True)
    comments = models.TextField(blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        preview = "[ID: " + str(self.id) + "][" + str(self.timestamp) + "]" + "(" + str(self.musicID) + ")" + ": SENDER: " + str(self.sender) + "--> PARENT: " + str(self.comment_parent_id)
        return preview

# User Project Stems
class Track(models.Model):
    userID = models.ForeignKey(User)
    projectID = models.ForeignKey(Project)
    title = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    status = models.CharField(max_length=7, default="public")
    filename = models.FileField(max_length=200, blank=True)
    upload_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        preview = "[ID: " + str(self.id) + "]" + "[" + str(self.projectID) + "](" + str(self.userID) + ")" + self.title
        return preview

# User Project Stems
class Stem(models.Model):
    userID = models.ForeignKey(User)
    projectID = models.ForeignKey(Project)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    status = models.CharField(max_length=7, default="private")
    filename = models.FileField(max_length=200, blank=True)
    upload_date = models.DateTimeField(default=timezone.now)
	
    def __str__(self):
        preview = "[ID: " + str(self.id) + "]" + "[" + str(self.projectID) + "](" + str(self.userID) + ")" + self.title
        return preview