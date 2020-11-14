from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
import numpy as np
import json
from model import *

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    loadModel(request.args['ticker'])
    lr = joblib.load("model.pkl")
    print ('Model loaded')
    model_columns = joblib.load("model_columns.pkl")
    print ('Model columns loaded')

    if lr:
        try:
            # Set dataset equal to the last 30 rows of the original data set
            dataset = model_columns.drop(['Prediction'],1)[-30:]
            prediction = lr.predict(np.array(dataset))
            prices = prediction.tolist()
            prices = [round(num, 2) for num in prices]
            return json.dumps(prices)

        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 12345

    lr = joblib.load("model.pkl")
    print ('Model loaded')
    model_columns = joblib.load("model_columns.pkl")
    print ('Model columns loaded')

    app.run(port=port, debug=True)