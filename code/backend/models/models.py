from django.db import models
from django.contrib.auth.models import User  # 使用了django自带的用户模块


# class User(models.Model):
#     username = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)


class Image(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, )
    img_name = models.CharField(max_length=255)
    img_path = models.CharField(max_length=255)
    upload_time = models.DateTimeField()
    # album = models.ForeignKey("Album", on_delete=models.CASCADE, )


class Tag(models.Model):
    tag_name = models.CharField(max_length=50)
    tag_images = models.ManyToManyField("Image")


# class Album(models.Model):
#     album_name = models.CharField(max_length=50)
