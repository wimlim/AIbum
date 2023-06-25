"""
URL configuration for AIbum project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLConf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import views.UserManage
import views.PhotoManage
import views.SortManage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.UserManage.user_login),
    path('logout/', views.UserManage.user_logout),
    path('register/', views.UserManage.user_register),
    path('upload/', views.PhotoManage.upload),
    path('download/', views.PhotoManage.download),
    path('delete/', views.PhotoManage.delete),
    path('sortByTags/', views.PhotoManage.delete),
    path('sortByFace/', views.PhotoManage.delete),
]
