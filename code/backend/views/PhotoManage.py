from django.http import HttpResponse, FileResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils import timezone
from models.models import Image
import os


def upload(request):
    if request.method == 'POST':
        file = request.FILES['file']
        file_name = file.name
        file_path = 'statics/img/' + file_name
        path = default_storage.save(file_path, ContentFile(file.read()))
        img = Image.objects.create(path=path, name=file_name, upload_time=timezone.now(),
                                   owner_id=request.user.id)
        return HttpResponse('Upload successfully')
    else:
        return HttpResponse('Invalid request method')


def download(request):
    if request.method == 'GET':
        file_name = request.GET.get('file_name')
        img = Image.objects.get(name=file_name)
        if img is not None:
            path = img.path
            if os.path.exists(path):
                response = FileResponse(open(path, 'rb'))
                response['content_type'] = 'image/jpeg'
                response['Content-Disposition'] = 'attachment; filename={}'.format(file_name)
                return response
            else:
                return HttpResponse('File does not exist')
        else:
            return HttpResponse('No such image')
    else:
        return HttpResponse('Invalid request method')


def delete(request):
    if request.method == 'POST':
        file_name = request.POST.get('file_name')
        img = Image.objects.get(img_name=file_name)
        if img is not None:
            file_path = img.img_path
            default_storage.delete(file_path)
            img.delete()
            return HttpResponse('Delete successfully')
        else:
            return HttpResponse('No such image')
    else:
        return HttpResponse('Invalid request method')

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
