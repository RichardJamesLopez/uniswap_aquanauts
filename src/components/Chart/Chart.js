/* eslint-disable react/prop-types */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Line } from 'react-chartjs-2';
import './Chart.css';
import { timeframe } from '../../middleware/test';

const liquidityQuery = gql`
  query uniDayData {
    uniswapDayDatas (first: 60, orderBy: date, orderDirection: desc) {
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
      borderWidth: 0.5,
      data: [65, 62, 67, 66, 71],
    },
  ],
};

const dateFromUnix = timestamp => {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toString().slice(4, 10);
  return formattedDate;
};

const Chart = ({ chartData, title }) => {
  if (chartData && chartData.default === 'default') {
    const { loading, error, data } = useQuery(liquidityQuery);
    console.log('data from liquidityQuery', data);
    if (loading) {
      return 'Loading...';
    }
    if (error) {
      return `Error ${error.message}`;
    }
    if (data) {
      let dateData = [];
      let liquidityData = [];
      for (let i = data.uniswapDayDatas.length - 1; i >= 0; i--) {
        dateData.push(dateFromUnix(data.uniswapDayDatas[i].date));
        liquidityData.push(data.uniswapDayDatas[i].totalLiquidityUSD);
      }

      defaultData = {
        labels: dateData,
        datasets: [
          {
            label: 'Value (USD)',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0.5,
            data: liquidityData,
          },
        ],
      };
    }
  }



  return (
    <div>
      <Line
        data={defaultData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: title,
            fontSize: 18,
          },
          scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value.toLocaleString();

                    }
                }
            }]
        },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </div>
  );
};

export default Chart;
