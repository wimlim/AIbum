import pyaibum_core as pc

image = pc.Image("statics/img/family.jpg")

imagenet = pc.ImageNet("../../../core/models/")

facenet = pc.MTCNNFaceNet("../../../core/models/")
for x in range(1000):
    tags = imagenet.getTags(image, 5)

faces = facenet.getFaces(image)

for tag in tags:
    print(f"index: {tag['index']}, score: {tag['score']}")
print(faces)
