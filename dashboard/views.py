from django.shortcuts import render
from .models import Country, City, Product, Month, Sale
from django.db.models import Sum, Count
from decouple import config


def summary(request):
    context = {
        'site_url': config('SITE_URL'),
        'total_sales': Sale.objects.all().aggregate(Sum('tons')),
        'total_countries': Country.objects.all().aggregate(Count('name')),
        'total_cities': City.objects.all().aggregate(Count('name')),
        'years': Sale.objects.values_list('year', flat=True).distinct(),
        'countries': Country.objects.values_list('name', flat=True).distinct(),
    }
    return render(request, 'dashboard/summary.html', context)


def performance(request):
    context = {
        'site_url': config('SITE_URL'),
        'years': Sale.objects.values_list('year', flat=True).distinct(),
        'months': Month.objects.all()
    }
    return render(request, 'dashboard/performance.html', context)
