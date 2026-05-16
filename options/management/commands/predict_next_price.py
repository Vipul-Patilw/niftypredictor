import torch
import torch.nn as nn
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from django.core.management.base import BaseCommand
from options.models import OptionContract

class NiftyLSTM(nn.Module):
    def __init__(self, input_size, hidden_size=64, num_layers=2):
        super(NiftyLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])  # last timestep only

class Command(BaseCommand):
    help = 'Predict next Nifty option last_price using trained model'

    def handle(self, *args, **kwargs):
        print("📥 Fetching latest 50 rows from DB...")
        qs = OptionContract.objects.all().order_by('-fetched_at')[:60]  # Grab extra in case of NaN
        df = pd.DataFrame.from_records(qs.values(
            'last_price', 'open_interest', 'implied_volatility', 'underlying_value'
        )).dropna().head(50).iloc[::-1]  # latest 50, in order

        if len(df) < 50:
            print("❌ Not enough data (need at least 50 rows)")
            return

        features = ['last_price', 'open_interest', 'implied_volatility', 'underlying_value']
        data = df[features].values

        # Normalize
        scaler = MinMaxScaler()
        data_scaled = scaler.fit_transform(data)

        # Create sequence and tensor
        input_seq = torch.tensor(data_scaled[np.newaxis, :, :], dtype=torch.float32)

        # Load model
        input_size = len(features)
        model = NiftyLSTM(input_size)
        model.load_state_dict(torch.load("nifty_ai_model.pt"))
        model.eval()

        # Predict
        with torch.no_grad():
            prediction_scaled = model(input_seq).item()

        # Inverse scale to real price
        dummy_y = np.zeros((1, len(features)))
        dummy_y[0][0] = prediction_scaled
        real_price = scaler.inverse_transform(dummy_y)[0][0]

        print(f"🔮 Predicted Next last_price: ₹{real_price:.2f}")
        current_price = df['last_price'].iloc[-1]
        change_percent = ((real_price - current_price) / current_price) * 100

        print(f"📊 Current last_price: ₹{current_price:.2f}")
        print(f"📈 Predicted % change: {change_percent:.2f}%")

        if change_percent >= 2:
            print("✅ SIGNAL: BUY (Expected price increase)")
        else:
            print("⛔ SIGNAL: No Buy (Not enough gain expected)")

