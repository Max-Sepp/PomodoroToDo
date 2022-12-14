from django.db import models

# Create your models here.

import random
import string


def generate_code():
    while True:
        letters = string.ascii_letters + string.digits
        code = "".join(random.choice(letters) for i in range(10))
        if Todo.objects.filter(id=code).count() == 0:
            break
    return code


class Todo(models.Model):
    id = models.CharField(
        max_length=11, default=generate_code, unique=True, primary_key=True
    )
    title = models.CharField(max_length=50)
    body = models.CharField(max_length=250, default="")
    created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(
        "auth.User", related_name="todo", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-created"]
