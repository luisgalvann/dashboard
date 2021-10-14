from rest_framework.decorators import api_view
from rest_framework.response import Response
from dashboard.models import Country, City, Product, Month, Sale
import pandas as pd


@api_view(['GET'])
def sales_product(request, country, year):
    df = get_dataframe()
    df = df[(df['country'] == country) & (df['year'] == year)]
    df = df[['product', 'tons']]
    df = df.groupby('product').sum('tons')

    data = []
    for i, tupl in enumerate(df.itertuples()):
        data.append({
            'product': tupl[0],
            'data': tupl[1]
        })
    return Response(data)


@api_view(['GET'])
def sales_city(request, country, year):
    df = get_dataframe()
    df = df[(df['country'] == country) & (df['year'] == year)]
    df = df[['city', 'tons']]
    df = df.groupby('city').sum('tons')

    data = []
    for i, tupl in enumerate(df.itertuples()):
        data.append({
            'city': tupl[0],
            'data': tupl[1]
        })
    return Response(data)


@api_view(['GET'])
def sales_year(request, year):
    df = get_dataframe()
    df = df[(df['year'] == year)]
    df = df.pivot_table(index='product', columns='month', aggfunc='sum')
    
    data = []
    for i, tupl in enumerate(df.itertuples()):
        data.append({
            'product': tupl[0],
            'data': df.values.tolist()[i]
        })
    return Response(data)


def get_dataframe():
    sales = pd.DataFrame(Sale.objects.all().values())
    countries = pd.DataFrame(Country.objects.all().values())
    cities = pd.DataFrame(City.objects.all().values())
    products = pd.DataFrame(Product.objects.all().values())
    months = pd.DataFrame(Month.objects.all().values())

    df = pd.merge(sales, countries, left_on='country_id', right_on='id')
    df = df.rename(columns={'name': 'country'})
    df = pd.merge(df, cities, left_on='city_id', right_on='id')
    df = df.rename(columns={'name': 'city'})
    df = pd.merge(df, products, left_on='product_id', right_on='id')
    df = df.rename(columns={'name': 'product'})
    df = pd.merge(df, months, left_on='month_id', right_on='id')
    df = df.rename(columns={'name': 'month'})

    df = df[['country', 'city', 'product', 'month', 'year', 'tons']]
    return df
