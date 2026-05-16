import joblib
import pandas as pd
from options.models import OptionContract

def predict_latest():
    model = joblib.load("options_model.pkl")
    latest = OptionContract.objects.latest("fetched_at")

    input_df = pd.DataFrame([{
        "strike_price": latest.strike_price,
        "option_type": 0 if latest.option_type == "CE" else 1,
        "last_price": latest.last_price,
        "open_interest": latest.open_interest,
        "change_in_oi": latest.change_in_oi,
        "implied_volatility": latest.implied_volatility,
        "total_traded_volume": latest.total_traded_volume,
        "bid_price": latest.bid_price,
        "ask_price": latest.ask_price,
        "underlying_value": latest.underlying_value,
    }])

    pred = model.predict(input_df)[0]
    return "🟢 Buy" if pred == 1 else "🔴 Don't Buy"
