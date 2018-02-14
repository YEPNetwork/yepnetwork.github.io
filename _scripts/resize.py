#!/usr/bin/env python
# https://gist.github.com/ihercowitz/642650/f01986c0b1ebd04be588b196eb3ffefe9853e113
# https://pillow.readthedocs.io/en/latest/reference/Image.html
# PIL is deprecated, install Pillow (see https://stackoverflow.com/a/20061019/871793)
# pip install Pillow

# See https://stackoverflow.com/a/1224777/871793
# rename -S .JPG .jpg2 *.JPG
# rename -S .jpg2 .jpg *.jpg2

from PIL import Image
import os, sys

def resizeImage(infile, output_dir="", size=(1024,768)):
  outfile = os.path.splitext(infile)[0]
  extension = os.path.splitext(infile)[1]

  if (cmp(extension, ".jpg")):
    return

  print "processing {0}".format(infile)

  if infile != outfile:
    try :
      im = Image.open(infile)
      im.thumbnail(size, Image.ANTIALIAS)
      im.save(output_dir + "/" + outfile + extension,"JPEG")
    except IOError:
      print "cannot reduce image for ", infile


if __name__=="__main__":
  output_dir = "resized"
  dir = os.getcwd()

  if not os.path.exists(os.path.join(dir,output_dir)):
    os.mkdir(output_dir)

  for file in os.listdir(dir):
    resizeImage(file,output_dir)
