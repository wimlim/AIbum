import pyaibum_core as pc

image = pc.Image("statics/img/family.jpg")

imagenet = pc.ImageNet("../../../core/models/")
tags = imagenet.getTags(image, 5)
for tag in tags:
    print(f"index: {tag['index']}, score: {tag['score']}")

facenet = pc.MTCNNFaceNet("../../../core/models/")
faces = facenet.getFaces(image)
print(faces)
