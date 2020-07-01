from django.db import models
from datetime import datetime
# Create your models here.
class Restaurant(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name= models.CharField(max_length=100)
    address= models.CharField(max_length=100)
    cuisine= models.CharField(max_length=100)
    expense= models.CharField(max_length=100)
    offers= models.CharField(max_length=100)
    waitTime= models.IntegerField()
    
    class Meta:
        get_latest_by = "waitTime"

    def __str__(self):
        return self.name

class Reservation(models.Model):
    email = models.EmailField()
    restaurant = models.CharField(max_length=100)
    numberOfPeople= models.IntegerField()
    time= models.DateTimeField(default=datetime.now)

    def __str__(self):
        return str(self.email + " " + self.restaurant)
