from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.
class Music (models.Model):
    artist_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    upload_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        preview = "(" + self.artist_name + ") " + self.title
        return preview

class Account (models.Model):
    account_type = models.CharField(max_length=100)

    def __str__(self):
        preview = self.account_type
        return preview

class UserCategory (models.Model):
    name = models.CharField(max_length=10, blank=True)
    
    def __str__(self):
        preview = self.name
        return preview

class UserProfile (models.Model):
    userID = models.ForeignKey(User)
    address = models.CharField(max_length=200, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=16, blank=True, default="+19999999999") # validators should be a list
    biography = models.TextField(blank=True)
    social_network = models.CharField(max_length=200, blank=True)
    user_category = models.ForeignKey(UserCategory)

    def __str__(self):
        preview = "(" + str(self.userID) + ") " + self.phone_number
        return preview

