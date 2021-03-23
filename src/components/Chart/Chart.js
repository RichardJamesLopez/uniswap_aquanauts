import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Line } from 'react-chartjs-2';
import './Chart.css';
import { timeframe, pool, userAddress } from '../../middleware/test';

let blockNumber;

const liquidityQuery = gql`
query uniDayData {
  uniswapDayDatas (first: ${timeframe}, orderBy: date, orderDirection: desc) {
    date
    totalLiquidityUSD
  }
}
`;

const liquidityByPoolQuery = gql`
      query dailyPairLiquidity {
        pairDayDatas (first:${timeframe}, orderBy: date, orderDirection: desc, where: {
          pairAddress: "${pool}"
        }
      ) {
        date
          reserveUSD
        }
      }
    `;

const userLiquidity = gql`
  query userLiquidity {
     user (id: "${userAddress}",
        block: {
           number: ${blockNumber || 10}
            }) {
              liquidityPositions {
                liquidityTokenBalance
                pair {
                  id
                  totalSupply
                  reserveUSD
                }
              }
            }
         }`;

const state = {
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

const Chart = () => {
  const queryMultiple = () => {
    const res1 = useQuery(liquidityQuery);
    const res2 = useQuery(liquidityByPoolQuery);
    const res3 = useQuery(userLiquidity);
    return [res1, res2, res3];
  };

  const [
    { loading: loading1, data: data1 },
    { loading: loading2, data: data2 },
    { loading: loading3, data: data3 },
  ] = queryMultiple();

  if (data2) {
    console.log('liquidityByPoolQuery data in chart', data2);
  }
  if (data3) {
    console.log('userLiquidity data in chart', data3);
  }

  if (data1) {
    console.log('liquidityQuery data in chart', data1);
  }

  if (loading1) return <p>Loading...</p>;

  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: 'Liquidity Provider (LP) value in Pool',
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
