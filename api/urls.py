from django.urls import path

from . import views

urlpatterns = [
    path("", views.about),
    path("todos", views.Todos.as_view()),
    path("todos/<completed>", views.completed_or_not_todos.as_view()),
    path("todo/<str:id>", views.todo_detail.as_view()),
]
