from django.urls import path
from . import views


urlpatterns = [
    path('sales-year/<str:year>/', views.sales_year, name='sales-year'),
    path('sales-product/<str:country>/<str:year>/', views.sales_product, name='sales-product'),
    path('sales-city/<str:country>/<str:year>/', views.sales_city, name='sales-city'),
]
