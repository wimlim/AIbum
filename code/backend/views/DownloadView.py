from django.http import HttpResponse, FileResponse
from models.models import Image
import os


def download(request):
    if request.method == 'GET':
        file_name = request.GET.get('file_name')  # 键的名称是file_name，建议先统一下
        img = Image.objects.get(img_name=file_name, owner_id=request.user.id)
        if img is not None:
            file_path = img.img_path
            if os.path.exists(file_path):
                response = FileResponse(open(file_path, 'rb'))
                response['content_type'] = "image/jpeg"
                response['Content-Disposition'] = 'attachment; filename={}'.format(file_name)
                return response
            else:
                return HttpResponse('File does not exist')
        else:
            return HttpResponse('No such image')
    else:
        return HttpResponse('Invalid request method')

# 前端代码可参考下面：
# fetch('/download?file_name=your_file_name', {
#   method: 'GET',
#   headers: {
#     'Content-Type': 'application/json',
#     'Accept': 'application/json'
#   }
# })
# .then(response => response.blob())
# .then(blob => {
#   const url = window.URL.createObjectURL(blob);
#   const img = document.createElement('img');
#   img.src = url;
#   document.body.appendChild(img);
# });
