from django.http import HttpResponse, FileResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils import timezone
from models.models import Image


def upload(request):
    if request.method == 'POST':
        file = request.FILES['file']
        file_name = file.name
        file_path = 'statics/' + file_name
        path = default_storage.save(file_path, ContentFile(file.read()))
        img = Image.objects.create(img_name=file_name, upload_time=timezone.now(), img_path=path, owner_id=request.user.id)
        return HttpResponse('File uploaded successfully')
    else:
        return HttpResponse('Invalid request method')

# 前端发送图片可以参考下面的代码(暂时不考虑性能，用formData格式)：

# let fileField = document.createElement("input");
# fileField.type = "file";
# fileField.id = "fileField";
# document.body.appendChild(fileField);
# let formData = new FormData();
# let fileField = document.querySelector("#fileField");
#
# formData.append('file', fileField.files[0]);
# fetch('/upload/', {
#   method: 'POST',
#   body: formData
# })
# .then(response => response.json())
# .catch(error => console.error('Error:', error))
# .then(response => console.log('Success:', response));
