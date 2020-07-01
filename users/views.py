from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import models
# Create your views here.

class checkUser(APIView):
    """
    Login check for the user

    checks if the users entered password was same as the one existing in our database

    Request:
        method - post
        Fields - json object containing following fields
                    email : email address entered by the user
                    password: password entered by the user
    Responce:
        Responce is a json object containing following Fields
            result: True - only for successful login
                    False - for any other error
            cardEnding: last four digits of the users visa card
            email: The email address of the user
            error:  login successfull - for successful login
                    Incorrect password - If the password entered is not same as the actual actual Password
                    email doesnt exist please register to use our service - If the user has not yet registered
                                                                            for our service
                    other error messages are appropriatly returned if the values entered doesnt
                    comply with our guidelines. (ex - minPassword Length, not a valid email address, etc ..)
    Raises Exception:
        If email address is not yet registered on our service
    """
    serializer_class = serializers.checkUser

    def post(self, request):
        serializer = serializers.checkUser(data = request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            try:
                user = models.User.objects.get(email = email)
                actualPassword = user.password
                cardNumber = user.cardNumber
                if actualPassword == password:
                    return Response({
                        'result': True,
                        'cardEnding':  int(cardNumber[-4:]),
                        'email': email,
                        'error': 'login successfull'
                    })
                else:
                    return Response({
                        'result': False,
                        'cardEnding':  1234,
                        'email': email,
                        'error': 'Incorrect password'
                    })
            except Exception as e:
                return Response({
                    'result': False,
                    'cardEnding':  1234,
                    'email': email,
                    'error': 'email doesnt exist please register to use our service'
                })
        else:
            return Response({
                'result': False,
                'cardEnding':  1234,
                'email': 'any email',
                'error': serializer.errors['email'][0]
            })


class registerUser(APIView):
    """ To register the user into the database

        Checks the details given by the user while registering and adds the user into database

        Request:
            method - post
            Fields - json object containing following fields
                        email : email address entered by the user
                        name: name given by the user
                        cardNumber: The visa card number of the user
                        password: password entered by the user
                        addres: Address given by the user

        Responce:
            Responce is a json object containing following Fields
                result: True - only on successful registration
                        False - for any other error

                error:  'no error user got successfully registered' - if the user got registered successfully

                        'User already exist in the database' - if either entered email address or card number exists in our database

                        other error messages are appropriatly returned if the values entered doesnt
                        comply with our guidelines. (ex - minPassword Length, not a valid email address, etc ..)

        Raises Exception:
            If entered email address or card number is already present in our system
    """

    serializer_class = serializers.AddUser

    def post(self, request):
        serializer = serializers.AddUser(data = request.data)
        if serializer.is_valid():
            # on successful validation of the fields
            email = serializer.data.get('email')
            name = serializer.data.get('name')
            cardNumber = serializer.data.get('cardNumber')
            password = serializer.data.get('password')
            address = serializer.data.get('address')
            # creating a new user
            user = models.User(email = email, name = name, cardNumber = cardNumber, password = password, address = address)
            # a boolean variable to know if the query got executed or not
            var = True
            try:
                user.save()
            except Exception as e:
                var = False
            if var:
                return Response({'result': True,
                                'error': 'no error user got successfully registered'
                                })
            else:
                return Response({'result': False,
                                'error': 'User already exist in the database'
                                })

        else:
            return Response({'result': False,
                            'error': serializer.errors
                            })

class fetchInvoice(APIView):
    """  This function returns all the items present in the invoice

         Request:
                method - GET

         Respone:
                Result : True - on successful fetch from database
                         False - for any other error
                Responce is a json list having objects containing following Fields
                itemName: name of the item
                quantity: How many of these items are ordered
                itemPrice: price of the single item
                cost: the total cost

         Raises Exception:
                If the database fetch for all the items in invoice failed
    """
    def get(self, request):
        try:
            invoiceList = models.Invoice.objects.all()
            jsonList = []
            for item in invoiceList:
                itemDict = {}
                itemDict['itemName'] = item.itemName
                itemDict['quantity'] = item.quantity
                itemDict['itemPrice'] = item.itemPrice
                itemDict['cost'] = item.cost
                jsonList.append(itemDict)
            return Response({
                'invoiceList':jsonList,
                'result': True
            })
        except Exception as e:
            return Response({
                'result': False
            })
