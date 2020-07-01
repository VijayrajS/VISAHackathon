from django.db import models

# Create your models here.
class User(models.Model):
    """
    This class creates a modal or Table User in the database
    The User Model has following fields
    email: The unique email address which user use to register on Visa service
    name: name which the user uses while registering on our service
    cardNumber: The unique visas card number of the User
    password: The password of the user
    address: Address given by the user while registering for our service
    """
    email= models.CharField(max_length=100, unique=True)
    name= models.CharField(max_length=100)
    cardNumber= models.CharField(max_length=16, unique=True)
    password= models.CharField(max_length=100)
    address= models.CharField(max_length=100)

    # while retreiving rows in the User table they are ordered by their name field
    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Invoice(models.Model):
    """ This class represents a invoice in our database
        The Invoice class has following fields:
        itemName: The name of the item
        quantity: Number of items ordered
        itemPrice: price of this item
    """
    itemName = models.CharField(max_length = 255)
    quantity = models.IntegerField()
    itemPrice = models.IntegerField()
    cost = models.IntegerField()

    def __str__(self):
        return self.itemName
