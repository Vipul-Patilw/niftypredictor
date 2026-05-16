import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "niftypredictor.settings")  # replace with your settings module
django.setup()

from options.predict_from_latest import predict_latest  # your function file

print(predict_latest())
