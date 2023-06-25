from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import redirect, render


# django下的view整合了MVC中的V和C，
# 因为View写在前端，这里可以简单理解为controller
# 调用内置的login和logout函数，会自动写入清除缓存

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        if username == '' or password == '':
            return HttpResponse('username or password empty!')
        auth = authenticate(username=username, password=password)  # 判断账号密码是否匹配，若匹配，返回登录对象
        if auth:
            if auth.is_active:  # 验证用户是否注销
                login(request, auth)  # 写入cookie
                request.session.set_expiry(0)  # 关闭浏览器cookie消失，登录凭证消失
                return HttpResponse("login success!")
        return HttpResponse('password wrong!')
    else:
        return HttpResponse('method wrong!')


def user_logout(request):
    logout(request)  # 清除cookie
    return redirect("/login/")


def user_register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        if User.objects.filter(username=username):
            msg = 'username duplicates!'
        else:
            user = User.objects.create_user(username=username, password=password, email=email)
            msg = 'register success!'
        return HttpResponse(msg)
    return HttpResponse('method wrong!')
