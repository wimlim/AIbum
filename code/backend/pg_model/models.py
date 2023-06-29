from django.contrib.auth.models import User
from django.db import models


class Cluster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Image(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    cluster = models.ForeignKey(Cluster, on_delete=models.SET_DEFAULT, default=1)
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=255)
    upload_time = models.DateTimeField()


class Tag(models.Model):
    name = models.CharField(max_length=50)
    image = models.ManyToManyField("Image")


class Face(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    vector = models.FloatField(max_length=500)


class Album(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
