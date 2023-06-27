from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
import json
import hashlib

# django下的view整合了MVC中的V和C，
# 因为View写在前端，这里可以简单理解为controller
# 调用内置的login和logout函数，会自动写入清除缓存
# 后续可以结合redis优化缓存策略

def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('account')
        password = data.get('password')
        print(password)
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
    logout(request)  # 清除cookie
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
                    'email': user.email,
                }
            })
    else:
        return JsonResponse({
            'message': 'method wrong!'
        }, status=404)
