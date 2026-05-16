from django.core.management.base import BaseCommand
from options.nse_fetcher import fetch_nifty_options

class Command(BaseCommand):
    help = 'Fetches live Nifty options data from NSE'

    def handle(self, *args, **kwargs):
        fetch_nifty_options()
        self.stdout.write(self.style.SUCCESS("Nifty options fetched successfully."))
