import React, { Component } from 'react';
import './App.css';
import Chart from "./components/Chart";
import Predict from "./components/Predict";
import axios from 'axios';
import moment from 'moment';

class App extends Component {
  constructor() {
    super();
    this.state = {
      symbol: 'Stock',
      error: '',
      chartData: {}
    };
  }

  getDates = () => {
    let dateArray = [];
    let startDate = new Date();
    let stopDate = new Date();
    startDate.setDate(startDate.getDate()-29);
    stopDate.setDate(stopDate.getDate());
    
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format('MM/DD') )
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  getChartData = (ticker) => {
    this.setState({ error: ''});
		axios.post('/predict', null, { params: { ticker }})
      .then(res => {
        const data = res.data;
        const color = data[data.length - 1] > data[0] ? '#34c759' : '#ff3a2f';
        const dates = this.getDates();

      	this.setState({
          symbol: ticker,
          chartData: {
            labels: dates,
            datasets: [
            {
                label: 'Prices',
                height: 500,
                data: data,
                pointRadius: 0,
                lineTension: 0,
                borderColor: color,
                borderWidth: 2,
                pointHoverBorderWidth: 0,
                hoverBorderWidth: 0,
                hoverRadius: 0,
                fill: false
              }
            ]
          }
        });
      })
      .catch(error => {
        this.setState({ error: 'Please enter a valid symbol.'})
      });
  }

  render() {
    return (
      <div>
        <Chart chartData={this.state.chartData} ticker={this.state.symbol} getDates={this.getDates}/>
        <Predict getChartData={this.getChartData} error={this.state.error}/>
      </div>
    );
  }
}

export default App;
