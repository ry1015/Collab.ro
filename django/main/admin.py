from django.contrib import admin
from . models import Music, Account

# Register your models here.
models = {Music, Account}
admin.site.register(models)