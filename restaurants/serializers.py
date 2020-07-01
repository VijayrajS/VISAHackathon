from rest_framework import serializers
from .models import Reservation
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields= ['email','restaurant','numberOfPeople','time']

class QueryReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['email']

class PayReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['email', 'restaurant']