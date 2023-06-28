from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
import re

# test
class MWare(MiddlewareMixin):
    count_dict = {}

    def process_request(self, request):
        request_ip = request.META['REMOTE_ADDR']  # get IP
        request_url = request.path_info  # getURL
        if re.match(r'^/test', request_url):
            times = self.count_dict.get(request_ip, 0)  
            self.count_dict[request_ip] = times + 1  
            if times < 10:  
                return
            else:
                return HttpResponse("请求失败")
        else:  
            return
