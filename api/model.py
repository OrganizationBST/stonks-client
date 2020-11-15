import pandas_datareader as web
import numpy as np 
import pandas as pd
import joblib
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from datetime import datetime

def loadModel(stock):
    # Get the stock quote
    df = web.DataReader(stock, 'yahoo', '2012-01-01', datetime.date(datetime.now()))

    # Create a new dataframe with only the Close Price
    data = df.filter(['Close'])

    n = 30
    # Create another column (the target or dependent variable) shifted 'n' units up
    data['Prediction'] = df[['Close']].shift(-1)

    # Create the independent data set (x) and dependent data set (y), and remove the last 'n' rows
    x = np.array(data.drop(['Prediction'],1))[:-n]
    y = np.array(data['Prediction'])[:-n]

    # Split the data into 80% training and 20% testing
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)
    tree = DecisionTreeRegressor().fit(x_train, y_train)

    # Save model
    joblib.dump(tree, 'model.pkl')

    # Load saved model and save data columns from training
    tree = joblib.load('model.pkl')
    model_columns = data
    joblib.dump(model_columns, 'model_columns.pkl')