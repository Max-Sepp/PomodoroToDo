from django.urls import path

from . import views

urlpatterns = [
    path("", views.about),
    path("todos", views.Todos),
    path("todos/<completed>", views.completed_or_not_todos),
    path("todo/<str:id>", views.todo_detail),
]
