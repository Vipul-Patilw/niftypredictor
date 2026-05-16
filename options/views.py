from rest_framework.decorators import api_view
from rest_framework.response import Response
import yfinance as yf

@api_view(['GET'])
def live_data(request):
    try:
        nifty = yf.Ticker("^NSEI")
        banknifty = yf.Ticker("^NSEBANK")

        nifty_history = nifty.history(period="2d")
        banknifty_history = banknifty.history(period="2d")

        nifty_current = nifty_history['Close'].iloc[-1]
        nifty_prev = nifty_history['Close'].iloc[-2]

        banknifty_current = banknifty_history['Close'].iloc[-1]
        banknifty_prev = banknifty_history['Close'].iloc[-2]

        nifty_change = nifty_current - nifty_prev
        banknifty_change = banknifty_current - banknifty_prev

        return Response({
           "nifty": {
                "price": f"{float(nifty_current):.2f}",
                "change": f"{float(nifty_change):.2f}",
                "percent": f"{(nifty_change / nifty_prev) * 100:.2f}"
            },
            "banknifty": {
                "price": f"{float(banknifty_current):.2f}",
                "change": f"{float(banknifty_change):.2f}",
                "percent": f"{(banknifty_change / banknifty_prev) * 100:.2f}",
            }
        })
    except Exception as e:
        return Response({"error": str(e) or "Unknown error"})
