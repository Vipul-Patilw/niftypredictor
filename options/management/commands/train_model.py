import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset, random_split
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from django.core.management.base import BaseCommand
from options.models import OptionContract

# 🔁 Define the LSTM model
class NiftyLSTM(nn.Module):
    def __init__(self, input_size, hidden_size=64, num_layers=2):
        super(NiftyLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = out[:, -1, :]  # Use output from last time step
        return self.fc(out)

class Command(BaseCommand):
    help = 'Train AI model on Nifty options data using PyTorch'

    def handle(self, *args, **kwargs):
        print("📥 Fetching data from database...")
        qs = OptionContract.objects.all().values(
            'last_price', 'open_interest', 'implied_volatility', 'underlying_value'
        ).order_by('fetched_at')

        df = pd.DataFrame.from_records(qs).dropna()
        features = ['last_price', 'open_interest', 'implied_volatility', 'underlying_value']
        data = df[features].values

        # Normalize
        scaler = MinMaxScaler()
        scaled_data = scaler.fit_transform(data)

        # 🔁 Sequence generation
        def create_sequences(data, seq_length=50):
            X, y = [], []
            for i in range(len(data) - seq_length):
                X.append(data[i:i + seq_length])
                y.append(data[i + seq_length][0])  # Predict last_price
            return np.array(X), np.array(y)

        seq_len = 50
        X, y = create_sequences(scaled_data, seq_len)
        X = torch.tensor(X, dtype=torch.float32)
        y = torch.tensor(y, dtype=torch.float32).view(-1, 1)

        # Dataset and loader
        dataset = TensorDataset(X, y)
        train_len = int(0.8 * len(dataset))
        test_len = len(dataset) - train_len
        train_data, test_data = random_split(dataset, [train_len, test_len])
        train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
        test_loader = DataLoader(test_data, batch_size=32)

        # 🔁 Model, loss, optimizer
        model = NiftyLSTM(input_size=len(features))
        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

        # 🧠 Training loop
        print("🧠 Training PyTorch LSTM model...")
        model.train()
        for epoch in range(10):
            total_loss = 0
            for xb, yb in train_loader:
                pred = model(xb)
                loss = criterion(pred, yb)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
                total_loss += loss.item()
            print(f"Epoch {epoch+1}, Loss: {total_loss:.4f}")

        # 💾 Save model
        torch.save(model.state_dict(), "nifty_ai_model.pt")
        print("✅ Model trained and saved as nifty_ai_model.pt")
        
