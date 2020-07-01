from django.contrib import admin
from .models import Reservation,Restaurant
# Register your models here.
admin.site.register(Reservation)
admin.site.register(Restaurant)