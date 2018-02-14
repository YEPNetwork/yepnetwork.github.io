#!/usr/bin/env python
# Source: https://stackoverflow.com/a/2612451/871793

from PIL import Image
import os, sys

def resizeImage(infile, output_dir="", size=(128,128)):
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
  output_dir = "thumbnail"
  dir = os.getcwd()

  if not os.path.exists(os.path.join(dir,output_dir)):
    os.mkdir(output_dir)

  for file in os.listdir(dir):
    resizeImage(file, output_dir)
