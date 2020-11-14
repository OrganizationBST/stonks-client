import pandas_datareader as web
import numpy as np 
import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from datetime import datetime

def loadModel(stock):
    # Get the stock quote
    df = web.DataReader(stock, 'yahoo', '2012-01-01', datetime.date(datetime.now()))

    # Create a new dataframe with only the Close Price
    data = df.filter(['Close'])

    # A variable for predicting n days out into the future
    n = 30
    # Create another column (the target or dependent variable) shifted 'n' units up
    data['Prediction'] = df[['Close']].shift(-1)

    # Create the independent data set (x) and dependent data set (y), and remove the last 'n' rows
    x = np.array(data.drop(['Prediction'],1))
    x = x[:-n]
    y = np.array(data['Prediction'])
    y = y[:-n]

    # Split the data into 80% training and 20% testing
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

    # Create and train the Linear Regression Model
    lr = LinearRegression()
    lr.fit(x_train, y_train)

    # lr_confidence = lr.score(x_test, y_test)

    # Save model
    joblib.dump(lr, 'model.pkl')

    # Load saved model and save data columns from training
    lr = joblib.load('model.pkl')
    model_columns = data
    joblib.dump(model_columns, 'model_columns.pkl')