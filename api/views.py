from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status

# Create your views here.


@api_view(["GET"])
def about(request):
    """
    returns available rest APIs
    """
    apis = {"get_post_todos": "/todos"}

    return Response(apis)


@api_view(["GET", "POST"])
def Todos(request):
    if request.method == "GET":
        todos = models.Todo.objects.all()
        serializer = serializers.Todo_Serializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = serializers.Todo_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
