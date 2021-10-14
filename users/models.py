from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='unknown.jpeg', upload_to='account_img')

    def __str__(self):
        return f'Account ({self.user.username})'
