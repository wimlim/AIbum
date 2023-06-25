import cv2
import numpy as np
import ncnn
import sys

class ImageApi:
    def __init__(self):
        self.net = ncnn.Net()
        self.net.opt.use_vulkan_compute = True
        self.topk = 5

    def load_model(self):
        if self.net.load_param("models/mobilenet_v3.param") != 0:
            print("Failed to load model parameter file!")
            return -1

        if self.net.load_model("models/mobilenet_v3.bin") != 0:
            print("Failed to load model binary file!")
            return -1

        return 0

    def process_image(self, image_path):
        m = cv2.imread(image_path)
        if m is None:
            print("Failed to read image!")
            return -1

        in_ = ncnn.Mat.from_pixels_resize(m.data, ncnn.Mat.PIXEL_BGR2RGB, m.cols, m.rows, 224, 224)
        mean_vals = [0.485 / 255.0, 0.456 / 255.0, 0.406 / 255.0]
        norm_vals = [1.0 / 0.229 / 255.0, 1.0 / 0.224 / 255.0, 1.0 / 0.225 / 255.0]
        in_.substract_mean_normalize(mean_vals, norm_vals)

        out = ncnn.Mat()
        ex = self.net.create_extractor()
        ex.input("in0", in_)
        ex.extract("out0", out)
        cls_scores = [out[j] for j in range(out.w)]

        self.print_topk(cls_scores)

        return 0

    def print_topk(self, cls_scores):
        size = len(cls_scores)
        vec = [(cls_scores[i], i) for i in range(size)]
        vec.sort(reverse=True)

        for i in range(self.topk):
            score = vec[i][0]
            index = vec[i][1]
            print(f"{index} = {score}")

        return 0

if __name__ == "__main__":
    image = ImageApi()
    if image.load_model() != 0:
        sys.exit(-1)

    image_path = "input.png"
    image.process_image(image_path)
