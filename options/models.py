from django.db import models

# Create your models here.
from django.db import models
from django.db import models

class OptionContract(models.Model):
    OPTION_TYPE_CHOICES = [('CE', 'Call'), ('PE', 'Put')]

    symbol = models.CharField(max_length=10, default='NIFTY')
    option_type = models.CharField(max_length=2, choices=OPTION_TYPE_CHOICES)
    strike_price = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateField()
    identifier = models.CharField(max_length=50,blank=True,null=True)

    # Pricing & volume
    last_price = models.FloatField()
    change = models.FloatField()
    p_change = models.FloatField()
    total_traded_volume = models.BigIntegerField()

    # Open Interest
    open_interest = models.BigIntegerField()
    change_in_oi = models.BigIntegerField()
    p_change_in_oi = models.FloatField()

    # Bid-Ask Data
    bid_qty = models.BigIntegerField()
    bid_price = models.FloatField()
    ask_qty = models.BigIntegerField()
    ask_price = models.FloatField()

    # Market Depth
    total_buy_qty = models.BigIntegerField()
    total_sell_qty = models.BigIntegerField()

    # Volatility
    implied_volatility = models.FloatField()

    # Index value (Nifty 50) at this moment
    underlying_value = models.FloatField()

    # Timestamp of when data was fetched
    fetched_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.symbol} {self.expiry_date} {self.option_type} {self.strike_price}"

