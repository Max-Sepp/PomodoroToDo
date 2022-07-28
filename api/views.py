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
    apis = {
        "get_post_todos": "/todos",
        "get_put_delete_todo": "/todo/<id>",
    }

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


@api_view(["GET", "PUT", "DELETE"])
def todo_detail(request, id):
    try:
        todo = models.Todo.objects.get(id=id)
    except models.Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = serializers.Todo_Serializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serializer = serializers.Todo_Serializer(todo, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
