from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
import re


class MWare(MiddlewareMixin):
    count_dict = {}

    def process_request(self, request):
        request_ip = request.META['REMOTE_ADDR']  # 获取请求IP
        request_url = request.path_info  # 获取请求URL
        if re.match(r'^/test', request_url):
            times = self.count_dict.get(request_ip, 0)  # 查询当前IP的请求次数，默认为0
            self.count_dict[request_ip] = times + 1  # 请求次数 + 1
            if times < 10:  # 请求次数小于5，正常通过
                return
            else:
                return HttpResponse("请求失败")
        else:  # 不是以/test开头则直接正常通过
            return
