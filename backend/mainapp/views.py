from rest_framework.viewsets import ModelViewSet
from .models import Table, TableEntry, Friend
from .serializers import TableSerializer, TableEntrySerializer, FriendSerializer, UserSerializer, \
    TableWithUsersSerializer
from .filters import TableFilter, TableEntryFilter, UserFilter
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_class = UserFilter


class TableViewSet(ModelViewSet):
    # queryset = Table.objects.all().order_by('-date')
    # serializer_class = TableSerializer
    filterset_class = TableFilter

    def get_serializer_class(self):
        if self.action == 'list':
            return TableWithUsersSerializer
        return TableSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Table.objects.all().filter(users=user).order_by('-date')
        return queryset


# class TableWithUsersViewSet(ModelViewSet):
#     queryset = Table.objects.all().order_by('-date')
#     serializer_class = TableWithUsersSerializer
#     filterset_class = TableFilter

    # def get_queryset(self):
    #     user = self.request.user
    #     queryset = Table.objects.all().filter(users=user).order_by('-date')
    #     return queryset


class TableEntryViewSet(ModelViewSet):
    queryset = TableEntry.objects.all()
    serializer_class = TableEntrySerializer
    filterset_class = TableEntryFilter


class FriendViewSet(ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
