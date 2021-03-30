/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Chart from '../Chart';
import Sidebar from '../Sidebar';
import Page from '../Page';
import './Home.css';

class Home extends Component {
  componentDidMount() {}

  render() {
    const {
      data:
       { userLiquidityData, liquiduityByPoolData },
      match,
    }
       = this.props;

    return (
      <div>
        <div className="homeContainer">
          <Sidebar match={match} />
          <div className="chartContainer">
            <Chart
              chartData={{ default: 'default' }}
              title="Liquidity Provider (LP) value in Pool"
            />
          </div>
        </div>
        <Page />
      </div>

    );
  }
}

export default Home;
