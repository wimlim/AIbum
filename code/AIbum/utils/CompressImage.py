from PIL import Image
import os


def get_size(file):
    size = os.path.getsize(file)
    return size / 1024  # KB


def get_outfile(infile, outfile):
    if outfile:
        return outfile
    dire, suffix = os.path.splitext(infile)
    outfile = '{}-out{}'.format(dire, suffix)
    return outfile


def compress_image(infile, outfile='', size=150, step=10, quality=80):
    """
    :param infile:  original path
    :param outfile: target path
    :param size:    target size /KB
    :param step:    compression ratio
    :param quality: Initial compression ratio
    :return:        compressed path, size
    """
    o_size = get_size(infile)
    if o_size <= size:
        return infile
    outfile = get_outfile(infile, outfile)
    while o_size > size:
        im = Image.open(infile)
        im.save(outfile, quality=quality)
        if quality - step < 0:
            break
        quality -= step
        o_size = get_size(outfile)
    return outfile, get_size(outfile)

