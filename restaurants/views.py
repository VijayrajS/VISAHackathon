"""
APIs called:
    1) Visa Merchant Locator API
    2) Visa Queue Insights API
    3) Visa Merchant Offers Resource Center(VMORC)
    4) Visa Direct(mVisa MerchantPushPayments) API call
"""
import requests
import json
import random
import os

from django.http import HttpResponse
import xml.etree.ElementTree as ET
from .models import Restaurant, Reservation
from .serializers import ReservationSerializer, QueryReservationSerializer, PayReservationSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def index(request):
    return HttpResponse("<h1>Server is working</h1>")

class reserveTable(APIView):
    """
    reserves the booking for provided email and restaurant name.
    args:
        POST request
        {
            'email', 'restaurant', 'numberOfPeople', 'time'
        }
    returns:
        Json Object
        {
            'result': 'true' when booking has been successfully made, 'false' for duplicate booking
            'message': response message
        }
    """
    serializer_class = ReservationSerializer

    def post(self, request, format=None):
        serializer = ReservationSerializer(data = request.data)
        if serializer.is_valid():
            if not Reservation.objects.filter(email=serializer.validated_data['email'], restaurant__iexact=serializer.validated_data['restaurant']).exists():
                serializer.save()
                return Response({
                    'result': 'true',
                    'message': 'Booking has been made for {0} under {1}'.format(
                        serializer.validated_data['numberOfPeople'], serializer.validated_data['email'])
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'result': 'false',
                    'message': 'Booking already exists for {}'.format(serializer.validated_data['email'])
                }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class fetchPendingReservations(APIView):
    """
    returns the details of pending booking made for user
    args:
        POST request
        {
            'email'
        }
    returns:
        Json Object
        {
            'result': 'true' for successful fetch, 'false' if no booking exists for user
            'reservations': list of restaurants booked by user
            [
                {
                    'restaurant': name of restaurant,
                    'numberOfPeople': number of people reserved for,
                    'time': time of booking,
                    'offers': available offers, otherwise None
                }
            ]
        }
    """
    serializer_class = QueryReservationSerializer
    def post(self, request, format=None):
        serializer = QueryReservationSerializer(data=request.data)
        if serializer.is_valid():
            reservations = Reservation.objects.filter(email=serializer.validated_data['email'])
            if reservations.exists():
                jsonList = []
                for item in reservations:
                    itemDict = {}
                    itemDict['restaurant'] = item.restaurant
                    itemDict['numberOfPeople'] = item.numberOfPeople
                    itemDict['time'] = item.time
                    # get the offers from restaurant table
                    # needs improvement
                    try:
                        restaurant = Restaurant.objects.filter(name=item.restaurant)[0]
                        itemDict['offers'] = restaurant.offers
                    except IndexError as e:
                        itemDict['offers']= 'None'
                    jsonList.append(itemDict)
                return Response({
                    'result': 'true',
                    'reservations': jsonList
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'result': 'false',
                    'reservations': []
                },status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

class payReservation(APIView):
    """
    removes the booking for user
    args:
        POST request
        {
            'email', 'restaurant'
        }
    returns:
        Json Object
        {
            'result': 'true' when booking has been successfully removed, 'false' when booking doesn't exist
            'message': response message
        }
    """
    serializer_class = PayReservationSerializer
    def post(self, request, format=None):
        serializer = PayReservationSerializer(data = request.data)
        if serializer.is_valid():
            reservation = Reservation.objects.filter(email=serializer.validated_data['email'], restaurant__iexact=serializer.validated_data['restaurant'])
            if reservation:
                reservation.delete()
                return Response({
                    'result':'true',
                    'message': "reservation has been successfully deleted for {}".format(serializer.validated_data['email'])
                }, status= status.HTTP_200_OK)
            else:
                return Response({
                    'result':'false',
                    'message':'Entry does not exist'
                }, status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors)

class getMerchantData(APIView):
    """
    Fetches merchant data based on zipcode or longitude/latitude

    Request :
        GET(zipcode is hardcoded right now)

    Response:
        JSON object containing {'id','name','address','cuisine','expense','offer','waitTime'}

    Exception Handling:
        Following exceptions are handled:
        1) If request to MerchantLocator API fails
        2) If insertion in restaurant table fails
    """
    def get(self, request, format=None):

        #### Synthesized data ####
        offers = ["5% off on total bill", "10% off on total bill", "20% off on total bill", "30% off on total bill",]
        cuisines = ["CHINESE", "CONTINENTAL", "ITALIAN", "INDIAN"]
        expenses = ["1","2","3"]

        #### Input ####
        zipcode = "94404"
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cert_file_path = os.path.join(BASE_DIR, "restaurants/cert.pem")
        key_file_path = os.path.join(BASE_DIR,"restaurants/key.pem")
        url = "https://sandbox.api.visa.com/merchantlocator/v1/locator"

        finalResponse = {"restaurants": []}

        #### Visa Merchant Locator API call ####
        startIdx = 1
        while startIdx < 2:
            payload = {
                "header": {
                    "messageDateTime": "2020-06-20T16:51:51.903",
                    "requestMessageId": "Request_001",
                    "startIndex": str(startIdx)
                },
                "searchAttrList": {
                    "merchantCategoryCode": ["5812"],
                    "merchantCountryCode": "840",
                    "merchantPostalCode": zipcode,
                    "distance": "20",
                    "distanceUnit": "M"
                },
                "responseAttrList": ["GNLOCATOR"],
                "searchOptions": {
                    "maxRecords": "10",
                    "matchIndicators": "true",
                    "matchScore": "true"
                }
            }

            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic UTlON1pTTVdZQzIxTFRXRjJHQVEyMUl6b0Fzb1lSNTBnOS1RZ2MwbTlieW81eXV2bzpCdjBqeThwM1ZyNDl5aUk0OTZCeXd6MXBNYzBUeFF3eUZ2M3lFUVc='
            }

            cert = (cert_file_path, key_file_path)
            try:
                response = requests.request("POST", url, headers=headers, data=json.dumps(payload), cert=cert)
                responseText = response.text.encode('utf8')
                responseJSON = json.loads(responseText)

                try:
                    restaurant = Restaurant(id=responseJSON['merchantLocatorServiceResponse']['response'][0]['responseValues']['visaMerchantId'],
                                            name=responseJSON['merchantLocatorServiceResponse']['response'][0]['responseValues']['visaMerchantName'],
                                            address=responseJSON['merchantLocatorServiceResponse']['response'][0]['responseValues']['merchantStreetAddress'], 
                                            cuisine=random.choice(cuisines),
                                            expense=random.choice(expenses),
                                            offers=random.choice(offers),
                                            waitTime=random.randrange(1, 30)
                                            )
                    restaurant.save()
                except Exception as e:
                    return HttpResponse("Error inserting into restaurant table: "+str(e))
                
            except Exception as e:
                return HttpResponse("API request error: "+str(e))
            startIdx += 1

        return self.staticMerchantData()

    def staticMerchantData(self):
        """
        Fetches static data from restaurant table in database
        This is done to reduce long time taken by dynamic API calls
        """
        try:
            restaurantList = Restaurant.objects.all()
            sortedRestaurantList = restaurantList.order_by('waitTime')
            response = {"restaurants": []}

            for restr in sortedRestaurantList:
                res={ 
                    "id" : restr.id,
                    "name" :  restr.name,
                    "address" : restr.address,
                    "cuisine" : restr.cuisine,
                    "expense" : restr.expense,
                    "offers" : restr.offers,
                    "waitTime" : restr.waitTime
                }
                response["restaurants"].append(res)

            formattedResponse = json.dumps(response, indent=4, sort_keys=True)
            return HttpResponse(formattedResponse, 'application/json')

        except Exception as e:
            return HttpResponse("Fetch error from restaurant table: "+str(e))

    def fetchWaitingTime(self,zipcode,cert_file_path,key_file_path):
        """
        Visa Queue Insights API call
        Returns waiting time for merchants in an area

        Request:
            kind : predict/feedback
            requestMessageId : unique id for service request

        Respone:
            merchantList containing ['name','waitTime','zipcode']

        Raises Exception:
            If API request fails
        """
        payload = {
            "requestHeader": {
                "messageDateTime": "2020-06-28T08:42:33.327",
                "requestMessageId": "6da60e1b8b024532a2e0eacb1af58581"
            },
            "requestData": {
                "kind": "predict"
            }
        }
        headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic UTlON1pTTVdZQzIxTFRXRjJHQVEyMUl6b0Fzb1lSNTBnOS1RZ2MwbTlieW81eXV2bzpCdjBqeThwM1ZyNDl5aUk0OTZCeXd6MXBNYzBUeFF3eUZ2M3lFUVc='
        }
        cert = (cert_file_path, key_file_path)
        url = "https://sandbox.api.visa.com/visaqueueinsights/v1/queueinsights"

        try:
            # Visa Queue Insights API called here
            response = requests.request("POST", url, headers=headers, data=json.dumps(payload), cert=cert)
        except Exception as e:
                return HttpResponse("Queue insights API request error: "+str(e))

        responseJSON = json.loads(response.text.encode('utf8'))
        formattedResponse = json.dumps(responseJSON, indent=4, sort_keys=True)

        return HttpResponse(formattedResponse, 'application/json')

    def getOffers(self,cert_file_path,key_file_path):
        """
        Visa Merchant Offers Resource Center(VMORC) API call
        Returns offers from merchants that can be availed by users

        Request:
            Only GET request available in sandbox environment

        Response:
            offers array containing ['offerID','offerStatus','language','validity']
        """
        url = "https://sandbox.api.visa.com/vmorc/offers/v1/byofferid"
        payload = {}
        headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Basic UTlON1pTTVdZQzIxTFRXRjJHQVEyMUl6b0Fzb1lSNTBnOS1RZ2MwbTlieW81eXV2bzpCdjBqeThwM1ZyNDl5aUk0OTZCeXd6MXBNYzBUeFF3eUZ2M3lFUVc=',
          'Cookie': 'serv_id=8e67f1fac322438464eff932e59f6b94'
        }
        cert = (cert_file_path, key_file_path)

        # VMORC API called here 
        response = requests.request("GET", url, headers=headers, data=json.dumps(payload), cert=cert)
        responseJSON = json.loads(response.text.encode('utf8'))
        formattedResponse = json.dumps(responseJSON, indent=4, sort_keys=True)

        return HttpResponse(formattedResponse, 'application/json')

class pushPayment(APIView):
    def get(self, request, format=None):
        """
        Visa Direct(mVisa MerchantPushPayments) API call
        Allows customer to pay using QR, NFC or merchant's PAN

        Request:
            recipientPrimaryAccountNumber: Merchants's uniqu PAN
            amount: Transaction amount

        Response:
            JSON object containing {'transactionIdentifier','transmissionDateTime','approvalCode'}
        """
        ##### INPUT ####
        merchantPAN = "4123640062698797"
        amount = "124.05"
        #################
        
        url = "https://sandbox.api.visa.com/visadirect/mvisa/v1/merchantpushpayments"
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cert_file_path = os.path.join(BASE_DIR, "restaurants/cert.pem")
        key_file_path = os.path.join(BASE_DIR,"restaurants/key.pem")
        payload =  {
            "acquirerCountryCode": "356",
            "acquiringBin": "408972",
            "amount": amount,
            "businessApplicationId": "MP",
            "cardAcceptor": {
                "address": {
                "city": "KOLKATA",
                "country": "IN"
                },
                "idCode": "CA-IDCode-77765",
                "name": "Visa Inc. USA-Foster City"
            },
            "localTransactionDateTime": "2020-06-30T20:32:22",
            "purchaseIdentifier": {
                "type": "0",
                "referenceNumber": "REF_123456789123456789123"
            },
            "recipientPrimaryAccountNumber": merchantPAN,
            "retrievalReferenceNumber": "412770451035",
            "secondaryId": "123TEST",
            "senderAccountNumber": "4027290077881587",
            "senderName": "Jasper",
            "senderReference": "",
            "systemsTraceAuditNumber": "451035",
            "transactionCurrencyCode": "356",
            "merchantCategoryCode": "5812",
            "settlementServiceIndicator": "9"
        }

        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic UTlON1pTTVdZQzIxTFRXRjJHQVEyMUl6b0Fzb1lSNTBnOS1RZ2MwbTlieW81eXV2bzpCdjBqeThwM1ZyNDl5aUk0OTZCeXd6MXBNYzBUeFF3eUZ2M3lFUVc=',
            'Cookie': 'serv_id=8e67f1fac322438464eff932e59f6b94'
        }
        cert = (cert_file_path, key_file_path)

        # Visa direct API called here 
        response = requests.request("POST", url, headers=headers, data=json.dumps(payload), cert=cert)
        formattedResponse=response.content.decode('utf-8')
        # Parsing xml response
        root = ET.fromstring(formattedResponse)
        jsonDict={}
        for i in root: 
            jsonDict[i.tag]=i.text
        formattedJsonDict = json.dumps(jsonDict, indent=4, sort_keys=True)

        return HttpResponse(formattedJsonDict, 'application/json')
