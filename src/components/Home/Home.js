/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Chart from '../Chart';
import Sidebar from '../Sidebar';

class Home extends Component {
  componentDidMount() {}

  render() {
    const {
      data: { userLiquidityData, liquidutyByPoolData },
    } = this.props;

    return (
      <div>
        <Sidebar />
        <Chart
          chartData={{ default: 'default' }}
          title="Liquidity Provider (LP) value in Pool"
        />
        <Chart
          chartData={userLiquidityData || []}
          title="User Liquidity"
        />
        <Chart
          chartData={liquidutyByPoolData || []}
          title="Liquidity By Pool Each Pool"
        />
      </div>
    );
  }
}

export default Home;
