from django.shortcuts import render

from rest_framework.decorators import api_view
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


@api_view(["GET"])
def about(request):
    """
    returns available rest APIs
    """
    apis = {
        "get_post_todos": "/todos",
        "completed_or_not_todos": "/todos/<completed>",
        "get_put_delete_todo": "/todo/<id>",
    }

    return Response(apis)


class Todos(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = models.Todo.objects.all()
    serializer_class = serializers.Todo_Serializer


class completed_or_not_todos(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.Todo_Serializer

    def get_queryset(self):
        """
        This view should return either all completed tasks or unompleted tasks
        """
        completed = self.kwargs["completed"]
        return models.Todo.objects.filter(completed=completed)


class todo_detail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = models.Todo.objects.all()
    serializer_class = serializers.Todo_Serializer
    lookup_field = "id"
    lookup_url_kwarg = "id"
