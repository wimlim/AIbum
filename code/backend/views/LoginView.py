from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import redirect, render


def login(request):  # django下的view整合了MVC中的V和C，如果View都写在前端，那么这里可以简单理解为controller~
    if request.method == 'POST':
        user = request.POST['user']
        password = request.POST['password']
        auth = authenticate(username=user, password=password)   # 验证账号和密码是否匹配
        if auth:  # 判断账号密码是否正确
            if auth.is_active:  # 验证用户是否注销
                login(request, auth)  # 写入cookie
                request.session.set_expiry(0)  # 关闭浏览器cookie消失，登录凭证消失
                return HttpResponse("login success!")
        return HttpResponse('password wrong!')
    else:
        return render(request, "register.html")  # 若登录页面写在前端，可忽略


def logout(request):
    logout(request)  # 清除cookie
    return redirect("/login/")


def register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        if User.objects.filter(username=username):
            msg = "用户名已存在."
        else:
            user = User.objects.create_user(username=username, password=password, email=email)
            msg = "注册成功!"
            return redirect("/login/")
    return render(request, "register.html", locals())  # 若注册页面写在前端，可忽略