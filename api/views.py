from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics

from . import models, serializers

# Create your views here.


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
    queryset = models.Todo.objects.all()
    serializer_class = serializers.Todo_Serializer


class completed_or_not_todos(generics.ListAPIView):
    serializer_class = serializers.Todo_Serializer

    def get_queryset(self):
        """
        This view should return either all completed tasks or unompleted tasks
        """
        completed = self.kwargs["completed"]
        return models.Todo.objects.filter(completed=completed)


class todo_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.Todo_Serializer
    lookup_field = "id"
    lookup_url_kwarg = "id"
