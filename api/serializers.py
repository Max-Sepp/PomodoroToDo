from rest_framework import serializers
from . import models


class Todo_Serializer(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = "__all__"
