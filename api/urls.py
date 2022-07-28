from django.urls import path

from . import views

urlpatterns = [
    path("", views.about),
    path("todos", views.Todos),
]
