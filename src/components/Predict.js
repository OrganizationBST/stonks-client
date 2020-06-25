import React, { Component } from 'react';

class Predict extends Component {
    state = {
      ticker: ''
    }

  onSubmit = (e) => {
      e.preventDefault();
      this.props.getChartData(this.state.ticker.toUpperCase());
      this.setState({ ticker: '' });
  }

  onChange = (e) => {
    this.setState({ ticker: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ display: 'flex', alignItems: 'center', 
          justifyContent: 'center', paddingTop: '40px' }}>
          <input 
            type="text" 
            name="title"
            style={{ display: 'flex', padding: '5px' }} 
            placeholder="Enter a Stock Ticker Symbol"
            value={this.state.ticker}
            onChange={this.onChange} 
          />
          <input 
           type="submit" 
            value="Predict Prices" 
            className="btn" 
            style={{ display: 'flex', padding: '5px'}}
          />
        </form>
        <div style={{ display: 'flex', alignItems: 'center', 
          justifyContent: 'center', paddingTop: '10px', color: '#ff3a2f' }}>{this.props.error}</div>
      </div>
    )
  }
}

export default Predict;