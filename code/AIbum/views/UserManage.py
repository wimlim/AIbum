from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.middleware.csrf import get_token
import json


def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('account')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({
                'message': 'username or password empties!'
            }, status=405)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                'status': 200,
                'message': 'login successful!',
                'data': {
                    'username': user.username,
                    'email': user.email,
                }
            })
        else:
            return JsonResponse({
                'message': 'username or password wrong!'
            }, status=406)
    else:
        return JsonResponse({
            'message': 'method wrong!'
        }, status=404)


def user_logout(request):
    logout(request)
    return redirect("/login/")


def user_register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('account')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({
                'message': 'username or password empty!'
            }, status=405)
        user = authenticate(request, username=username, password=password)
        if User.objects.filter(username=username):
            return JsonResponse({
                'message': 'username duplicates!'
            }, status=406)
        else:
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({
                'status': 200,
                'message': 'register successful!',
                'data': {
                    'username': user.username,

                }
            })
    else:
        return JsonResponse({
            'message': 'method wrong!'
        }, status=404)


