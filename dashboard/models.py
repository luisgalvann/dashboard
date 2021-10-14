from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'


class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'


class Product(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'


class Month(models.Model):
    name = models.CharField(max_length=3)

    def __str__(self):
        return f'{self.name}'

class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    month = models.ForeignKey(Month, on_delete=models.CASCADE)
    year = models.CharField(max_length=4, null=True)
    tons = models.FloatField(null=True)

    def __str__(self):
        return f'{self.product} - {self.city} - {self.year} - {self.month} - {self.tons}'
