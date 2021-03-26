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
      data: { userLiquidityData, liquidutyByPoolData },
      match,
    } = this.props;

    return (

      <>
        <div className="homeContainer">
          <Sidebar match={match} />
          <div className="chartContainer">
            <Chart
              chartData={{ default: 'default' }}
              title="Liquidity Provider (LP) value in Pool"
            />
      {/*
            <Chart
              chartData={userLiquidityData || []}
              title="User Liquidity"
            />
            <Chart
              chartData={liquidutyByPoolData || []}
              title="Liquidity By Pool Each Pool"
            />
            */}
          </div>
        </div>
        <Page />
      </>

    );
  }
}

export default Home;
