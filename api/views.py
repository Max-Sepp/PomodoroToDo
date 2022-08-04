from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics

from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from . import models, serializers

# Create your views here.


class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]


class Create_Todos(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = models.Todo.objects.all()
    serializer_class = serializers.Todo_Serializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class Todos(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.Todo_Serializer

    def get_queryset(self):
        return models.Todo.objects.filter(owner=self.request.user)


class todo_detail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.Todo_Serializer
    lookup_field = "id"
    lookup_url_kwarg = "id"

    def get_queryset(self):
        return models.Todo.objects.filter(owner=self.request.user)
