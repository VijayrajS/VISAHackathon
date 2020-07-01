from django.urls import path

from . import views

urlpatterns = [
    path('registerUser', views.registerUser.as_view()),
    path('checkUserLogin', views.checkUser.as_view()),
    path('fetchInvoice', views.fetchInvoice.as_view())
]
