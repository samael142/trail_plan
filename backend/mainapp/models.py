from django.db import models
from django.conf import settings


class Table(models.Model):
    date = models.DateField()
    name = models.CharField(max_length=128)
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='table_admin')
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='table_users')
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    locked = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class TableEntry(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='entry_user')
    good = models.CharField(max_length=64)
    quantity = models.PositiveIntegerField(blank=True)
    unit = models.CharField(max_length=16, blank=True)
    price = models.PositiveIntegerField(blank=True)
    locked = models.BooleanField(default=False)


class Friend(models.Model):
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_friend')
    active = models.BooleanField(default=False)
