from rest_framework import serializers
from . import models


class Todo_Serializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = models.Todo
        fields = ["id", "title", "body", "created", "completed", "owner"]
