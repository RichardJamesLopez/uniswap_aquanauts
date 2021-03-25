/* eslint-disable react/prop-types */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Line } from 'react-chartjs-2';
import './Chart.css';
import { timeframe } from '../../middleware/test';

const liquidityQuery = gql`
query uniDayData {
  uniswapDayDatas (first: ${timeframe}, orderBy: date, orderDirection: desc) {
    date
    totalLiquidityUSD
  }
}
`;

let defaultData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Value (USD)',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const Chart = ({ chartData, title }) => {
  if (chartData && chartData.default === 'default') {
    const { loading, error, data } = useQuery(liquidityQuery);
    console.log('data from liquidityQuery', data);
    //manipulate data object to fit the defaultData structure above 
  } else {
    console.log('ChartData', chartData);
    //manipulate data object to fit the defaultData structure above;
  }


  return (
    <div>
      <Line
        data={defaultData}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  );
};

export default Chart;
