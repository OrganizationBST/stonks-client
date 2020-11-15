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
      chartData: {},
      dates: [],
      gradients: []
    };
  }

  componentDidMount = () => {
    if (!this.state.gradients.length) {
      const ctx = document.getElementById('chart').getContext("2d");
      let gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient1.addColorStop(0, 'rgba(190, 238, 202, 0.2)');
      gradient1.addColorStop(1, 'white');
  
      let gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient2.addColorStop(0, 'rgba(255, 169, 165, 0.2)');
      gradient2.addColorStop(1, 'white');
  
      this.setState({gradients: [gradient1, gradient2]});
    }

    if (!this.state.dates.length) {
      let dateArray = [];
      let startDate = moment().subtract(30, 'days').toDate();
      let stopDate = moment();
      let currentDate = moment(startDate);

      while (currentDate <= stopDate) {
        if (currentDate.day() !== 6 && currentDate.day() !== 0) {
          dateArray.push( moment(currentDate).format('MM/D') )
        }
        currentDate = currentDate.add(1, 'days');
      }

      console.log(dateArray);
      this.setState({dates: dateArray});
    }
  }

  getChartData = (ticker) => {
    this.setState({ error: ''});
		axios.post('/predict', null, { params: { ticker }})
      .then(res => {
        let predicted = res.data.predicted;
        let actual = res.data.actual;
        let diff = predicted.length - this.state.dates.length;

        for (var i = 0; i < diff; i++) {
          predicted.shift();
          actual.shift();
        }

        const color = predicted[predicted.length - 1] > predicted[0] ? '#34c759' : '#ff3a2f';
        const gradient = predicted[predicted.length - 1] > predicted[0] ? this.state.gradients[0] : this.state.gradients[1];

      	this.setState({
          symbol: ticker,
          chartData: {
            labels: this.state.dates,
            datasets: [
            {
                label: 'Predicted',
                height: 500,
                data: predicted,
                pointRadius: 0,
                lineTension: 0,
                borderColor: color,
                backgroundColor: gradient,
                borderWidth: 2,
                pointHoverBorderWidth: 0,
                hoverBorderWidth: 0,
                hoverRadius: 0
              },
              {
                label: 'Actual',
                data: actual,
                pointRadius: 0,
                borderColor: 'transparent',
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
    document.title = 'Stock Price Predictor'
    return (
      <div>
        <Chart chartData={this.state.chartData} ticker={this.state.symbol} getDates={this.state.dates}/>
        <Predict getChartData={this.getChartData} error={this.state.error}/>
      </div>
    );
  }
}

export default App;
