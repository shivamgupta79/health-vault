from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data.get('features')
    if not features:
        return jsonify({'error': 'features missing'}), 400
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    prob = model.predict_proba(features)[0].tolist()
    return jsonify({'prediction': int(prediction), 'probabilities': prob})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
