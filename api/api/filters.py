from django_filters import rest_framework as filters

class ResponseFilter(filters.FilterSet):

    post = filters.CharFilter(name="post")