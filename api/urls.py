from django.urls import path

from . import views
from knox import views as knox_views

urlpatterns = [
    path("todos", views.Todos.as_view()),
    path("create_todos", views.Create_Todos.as_view()),
    path("todo/<str:id>", views.todo_detail.as_view()),
    path("login/", views.LoginView.as_view(), name="knox_login"),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
]
