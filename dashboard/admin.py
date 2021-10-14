from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Country, City, Product, Month, Sale


admin.site.register(Country)
admin.site.register(City)
admin.site.register(Product)
admin.site.register(Month)


@admin.register(Sale)
class SaleAdmin(ImportExportModelAdmin):
    list_display = ('product', 'country', 'city', 'month', 'year', 'tons')
