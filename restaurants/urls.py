"""vscs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
app_name='restaurants'

urlpatterns = [
    path('', views.index, name='index'),
    path('reserve', views.reserveTable.as_view(), name='reserveTable'),
    path('fetchPendingReservations', views.fetchPendingReservations.as_view(), name='fetchPendingReservations'),
    path('pay', views.payReservation.as_view(), name = 'payReservation'),
    path('fetchRestaurantList', views.getMerchantData.as_view(), name='restaurant'),
    path('pushPayment', views.pushPayment.as_view(), name='pushPayment')
]
