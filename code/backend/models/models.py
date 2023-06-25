from django.db import models
from django.contrib.auth.models import User  # 使用了django自带的User模块

# 首先通过用户ID将用户和上传的图片关联起来，
# 然后通过图片ID将图片和识别的人脸关联起来，
# 最后通过算法生成聚类，将相似人脸聚集起来.


class Cluster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Image(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    cluster = models.ForeignKey(Cluster, on_delete=models.SET_DEFAULT, default=2)  # 表示该图片尚未经人脸识别或未识别出人脸
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=255)
    upload_time = models.DateTimeField()
    # album = models.ForeignKey("Album", on_delete=models.CASCADE, )


class Tag(models.Model):
    name = models.CharField(max_length=50)
    image = models.ManyToManyField("Image")


class Face(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    vector = models.FloatField(max_length=500)


# class Album(models.Model):
#     album_name = models.CharField(max_length=50)
