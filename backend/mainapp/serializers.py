from rest_framework import serializers
from .models import Table, TableEntry, Friend
from django.contrib.auth.models import User


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'first_name', 'last_name', 'username')


class TableEntrySerializer(serializers.ModelSerializer):
    # user = serializers.SlugRelatedField(slug_field="first_name", read_only=True)

    class Meta:
        model = TableEntry
        fields = '__all__'


class TableWithUsersSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    admin = UserSerializer()

    class Meta:
        model = Table
        fields = '__all__'