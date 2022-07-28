from django.urls import path

from . import views

urlpatterns = [
    path("", views.about),
    path("todos", views.Todos),
    path("todo/<str:id>", views.todo_detail),
]
