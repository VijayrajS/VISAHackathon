from rest_framework import serializers

class AddUser(serializers.Serializer):
    email = serializers.EmailField(max_length = 100)
    name = serializers.CharField(max_length = 100)
    cardNumber = serializers.CharField(max_length = 100, min_length = 4)
    password = serializers.CharField(max_length = 100)
    address = serializers.CharField(max_length = 100)

class checkUser(serializers.Serializer):
    email = serializers.EmailField(max_length = 100)
    password = serializers.CharField(max_length = 100)
