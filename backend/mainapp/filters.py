from .models import TableEntry, Table
from django_filters import rest_framework as filters, Filter, FilterSet
from django.contrib.auth.models import User


class TableEntryFilter(filters.FilterSet):
    table = filters.CharFilter()

    class Meta:
        model = TableEntry
        fields = ['table']


class TableFilter(filters.FilterSet):
    user = filters.CharFilter()

    class Meta:
        model = Table
        fields = ['admin']


class NumberInFilter(filters.BaseInFilter, filters.NumberFilter):
    pass


class UserFilter(filters.FilterSet):
    pk = NumberInFilter(field_name='pk', lookup_expr='in')
    username = filters.CharFilter

    class Meta:
        model = User
        fields = ['pk', 'username']



