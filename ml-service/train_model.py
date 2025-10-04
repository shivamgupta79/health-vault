import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Demo data (replace with real feature extraction)
X = np.random.rand(100, 5)  # 5 features
y = np.random.randint(0, 2, 100)  # binary target: 0=low risk, 1=high risk

model = RandomForestClassifier(n_estimators=50)
model.fit(X, y)

# Save model
joblib.dump(model, 'model.pkl')
print("Model trained and saved as model.pkl")
