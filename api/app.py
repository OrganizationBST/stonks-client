from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import traceback
import pandas as pd
import numpy as np
import json
from model import *

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    loadModel(request.args['ticker'])
    tree = joblib.load("model.pkl")
    print ('Model loaded')
    model_columns = joblib.load("model_columns.pkl")
    print ('Model columns loaded')

    if tree:
        try:
            dataset = np.array(model_columns.drop(['Prediction'],1)[-30:])
            predicted = tree.predict(dataset)
            predicted = [round(num, 2) for num in predicted]
            actual = dataset.flatten().tolist()
            actual = [round(num, 2) for num in actual]

            return {
                'predicted': predicted,
                'actual': actual
            }

        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 5000

    tree = joblib.load("model.pkl")
    print ('Model loaded')
    model_columns = joblib.load("model_columns.pkl")
    print ('Model columns loaded')

    app.run(port=port)