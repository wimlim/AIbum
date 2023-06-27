from django.http import HttpResponse, FileResponse, JsonResponse
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


def getPictures(request):
    if request.method == 'GET':
        images = Image.objects.filter(owner_id=request.user.id)
        if images:
            images_data = []
            for img in images:
                path = img.path
                if os.path.exists(path):
                    with open(path, 'rb') as f:
                        image_data = f.read()
                    images_data.append({
                        'file_name': img.name,
                        'image_data': image_data,
                        'content_type': 'image/jpeg',
                    })
                else:
                    return JsonResponse({'message': 'File does not exist!'}, status=404)
            return JsonResponse(images_data, safe=False)
        else:
            return JsonResponse({'message': 'No such image!'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method!'}, status=404)
