import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    ticker: 'Stock'
  }

  render() {
    const toolTipTitles = this.props.getDates();
    return (
      <div className="chart">
        <Line
          data={this.props.chartData}
          height={500}
          options={{
            title: {
              display: this.props.displayTitle,
              text: `${this.props.ticker} Price Predictions`,
              fontSize: 25,
              padding: 50
            },
            legend: {
              display: this.props.displayLegend,
            },
            tooltips: {
              callbacks: {
                label: (data) => {
                  return `${data.yLabel} USD`;
                },
                title: (data) => {
                  return toolTipTitles[data[0].index];
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              caretSize: 0,
              xPadding: 8, 
              displayColors: false,
              intersect: false,
              axis: 'x'
            },
            animation: {
              duration: 0
            },
            layout: {
              padding: {
                  left: 50,
                  right: 50
              }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  drawOnChartArea: false
                }
              }],
              yAxes: [{
                gridLines: {
                  drawOnChartArea: true
                }
              }]
            },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

export default Chart;