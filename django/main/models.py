from django.db import models
from django.utils import timezone

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
        preview2 = self.account_type
        return preview2