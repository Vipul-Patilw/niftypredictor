# 📈 NiftyPredictor

A Django-based machine learning application that predicts **NIFTY options** using a pre-trained ML model. The project combines a Python/Django backend with a trained scikit-learn model to forecast option behaviour based on the latest market data.

---

## 🗂️ Project Structure

```
niftypredictor/
├── niftypredictor/          # Django project (settings, URLs, WSGI)
├── options/                 # Django app — data models, views, ML logic
│   └── management/
│       └── commands/
│           └── train_model.py   # Django management command to train the model
├── node_modules/            # Node.js dependencies
├── manage.py                # Django entry point
├── train_model.py           # Script to trigger model training outside Django shell
├── predict_option.py        # Script to run a prediction from the latest data
├── options_model.pkl        # Serialised (pickled) trained ML model
├── package.json             # Node dependencies (axios)
└── .gitignore
```

---

## ✨ Features

- Predict NIFTY options (Call/Put signals) using a machine learning model
- Django-powered backend with database support for storing options data
- Pre-trained model saved as `options_model.pkl` — no retraining needed for immediate use
- Standalone scripts for training (`train_model.py`) and prediction (`predict_option.py`)
- Modular Django management command for retraining the model on fresh data

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django (Python) |
| ML Model | scikit-learn (pickled as `.pkl`) |
| HTTP Client | axios (Node.js) |
| Language | Python 3.x |

---

## ⚙️ Setup & Installation

### Prerequisites

- Python 3.8+
- pip
- Node.js & npm (for axios dependency)
- Virtual environment (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/Vipul-Patilw/niftypredictor.git
cd niftypredictor
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows
```

### 3. Install Python dependencies

```bash
pip install django scikit-learn pandas numpy
```

### 4. Install Node.js dependencies

```bash
npm install
```

### 5. Apply Django migrations

```bash
python manage.py migrate
```

---

## 🚀 Usage

### Run the Django development server

```bash
python manage.py runserver
```

### Train the model

Re-train the model on the latest data stored in the database:

```bash
python train_model.py
```

This sets up the Django environment and calls the `train()` function from the `train_model` management command, saving a fresh `options_model.pkl`.

### Run a prediction

Predict the option signal from the latest available data:

```bash
python predict_option.py
```

Output will be printed to the console (e.g., `CALL`, `PUT`, or a confidence score).

### Train via Django management command

```bash
python manage.py train_model
```

---

## 🔧 Configuration

Open `niftypredictor/settings.py` and update:

- `DATABASES` — configure your preferred database (default: SQLite)
- `ALLOWED_HOSTS` — add your server IP or domain for production
- `SECRET_KEY` — replace with a secure random key before deploying

---

## 📦 Key Files

| File | Purpose |
|---|---|
| `options_model.pkl` | Pre-trained ML model — load this to make predictions without retraining |
| `predict_option.py` | Standalone prediction script using the latest DB entry |
| `train_model.py` | Standalone training script — retrains and overwrites the `.pkl` |
| `options/management/commands/train_model.py` | Django management command containing the `train()` function |

---

## ⚠️ Disclaimer

This project is built for **educational and research purposes only**. Predictions made by this tool should **not** be used as financial advice. Options trading involves significant risk. Always consult a SEBI-registered financial advisor before making investment decisions.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source. Add a `LICENSE` file to specify terms (e.g., MIT).
