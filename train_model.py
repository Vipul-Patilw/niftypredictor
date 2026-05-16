import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "niftypredictor.settings")  # replace with your settings module
django.setup()

from niftypredictor.options.management.commands.train_model import train  # assuming you moved train() here

train()
