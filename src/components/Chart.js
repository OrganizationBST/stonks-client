import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    ticker: 'Stock'
  }

  render() {
    const toolTipTitles = this.props.getDates;
    
    return (
      <div className="chart">
        <Line
          id='chart'
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
              titleFontColor: 'black',
              callbacks: {
                label: (data) => {
                  return `${data.datasetIndex === 0 ? ' Predicted' : ' Actual'}: ${data.value} USD`;
                },
                title: (data) => {
                  return toolTipTitles[data[0].index];
                },
                labelTextColor: () => {
                  return 'black'
                }
              },
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              caretSize: 0,
              xPadding: 8, 
              displayColors: true,
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