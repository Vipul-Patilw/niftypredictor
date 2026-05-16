# options/nse_fetcher.py

import requests
import json
from time import sleep
from options.models import OptionContract
from django.utils.dateparse import parse_date
import datetime
from django.utils.timezone import now
from django.db.models.functions import TruncDate
from django.utils import timezone
from pytz import timezone as pytz_timezone
def fetch_nifty_options():
    print("🟡 Hitting NSE homepage (for cookies)...")
    
    session = requests.Session()
    headers = {
         "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.nseindia.com/option-chain",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    }

    try:
        unchanged=False
        # Step 1: Load homepage to get cookies
        session.get("https://www.nseindia.com", headers=headers, timeout=10)
        sleep(2)  # wait a bit for server to not block you

        # Step 2: Hit the Option Chain API
        print("🟢 Fetching Option Chain API...")
        url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
        response = session.get(url, headers=headers, timeout=10)
        if response.status_code == 401:
            print("⚠️  Got 401 Unauthorized. Retrying in 5s...")
            sleep(5)
            response = session.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            print(f"❌ API Error: {response.status_code}")
            return None

        data = response.json()
        records = data["records"]["data"]
        print(f"✅ Got {len(records)} option chain records")
        for item in records:
            strike = item.get("strikePrice")
            expiry = datetime.datetime.strptime(item.get("expiryDate"), '%d-%b-%Y')
            underlying_value = item.get("CE", item.get("PE", {})).get("underlyingValue", 0)
            # print(f"expiry date1: {item.get("expiryDate")}")
            for option_type in ["CE", "PE"]:
                opt_data = item.get(option_type)
                if not opt_data:
                    continue  # CE/PE might not be present
                # print(f"expiry date: {expiry}")
                india_tz = pytz_timezone('Asia/Kolkata')
                current_date = timezone.now().astimezone(india_tz).date()
    
                
                existing = OptionContract.objects.filter(
                    identifier=opt_data.get("identifier", "")
                ).order_by("-fetched_at").first()
          
                # Compare if data has changed since last fetch today
                if existing:
                    if current_date == existing.fetched_at.date():
                        print("enter under exisintgs")
                        unchanged = (
                            existing.last_price == opt_data.get("lastPrice", 0) and
                            existing.open_interest == opt_data.get("openInterest", 0) and
                            existing.implied_volatility == opt_data.get("impliedVolatility", 0)
                        )
                        if unchanged:
                            print("enter under unchanged")
                            continue
               
                OptionContract.objects.create(
                    symbol=opt_data.get("underlying", "NIFTY"),
                    option_type=option_type,
                    strike_price=opt_data.get("strikePrice"),
                    expiry_date=expiry,
                    identifier=opt_data.get("identifier", ""),
                    last_price=opt_data.get("lastPrice", 0),
                    change=opt_data.get("change", 0),
                    p_change=opt_data.get("pChange", 0),
                    total_traded_volume=opt_data.get("totalTradedVolume", 0),
                    open_interest=opt_data.get("openInterest", 0),
                    change_in_oi=opt_data.get("changeinOpenInterest", 0),
                    p_change_in_oi=opt_data.get("pchangeinOpenInterest", 0),
                    bid_qty=opt_data.get("bidQty", 0),
                    bid_price=opt_data.get("bidprice", 0),
                    ask_qty=opt_data.get("askQty", 0),
                    ask_price=opt_data.get("askPrice", 0),
                    total_buy_qty=opt_data.get("totalBuyQuantity", 0),
                    total_sell_qty=opt_data.get("totalSellQuantity", 0),
                    implied_volatility=opt_data.get("impliedVolatility", 0),
                    underlying_value=opt_data.get("underlyingValue", underlying_value),
                )

        print("✅ Data saved to database.")
        return records

    except Exception as e:
        print("❌ Failed to fetch:", e)
        return None
