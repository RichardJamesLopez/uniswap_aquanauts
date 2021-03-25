import { gql } from '@apollo/client';
import { ethers } from 'ethers';
import { client } from '../config';

const provider = ethers.getDefaultProvider();

const requestUniSubgraph = query => {
  return client
    .query({ query })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

const dateFromUnix = timestamp => {
  const date = new Date(timestamp * 1000);
  return date;
};

export const liquidityQuery = async timeframe => {
  const query = gql`
      query uniDayData {
        uniswapDayDatas (first: ${timeframe}, orderBy: date, orderDirection: desc) {
          date
          totalLiquidityUSD
        }
      }
    `;

  const { user } = await requestUniSubgraph(query);
  const uniLiquidityByDay = user.uniswapDayDatas.map(x => {
    return {
      date: dateFromUnix(x.date),
      liquidity: x.totalLiquidityUSD,
    };
  });
  return uniLiquidityByDay;
};

export const liquidutyByPoolQuery = async (timeframe, pool) => {
  const query = gql`
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

  const {
    data: { pairDayDatas },
  } = await requestUniSubgraph(query);
  const poolLiquidityByDay = pairDayDatas.map(x => {
    return {
      date: dateFromUnix(x.date),
      liquidity: x.reserveUSD,
    };
  });
  return poolLiquidityByDay;
};

export const userLiquidity = async (
  userAddress,
  requestedPool,
  numDays,
) => {
  const userPositionByDay = [];
  let blockNumber = (await provider.getBlockNumber()) - 10 || 10;
  for (let i = 0; i < numDays; i++) {
    let pool;

    const query = gql`
      query userLiquidity {
        user (id: "${userAddress}",
        block: {
          number: ${blockNumber}
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

    const {
      data: { user },
    } = await requestUniSubgraph(query);

    const { liquidityPositions } = user;
    if (liquidityPositions.length === 0) {
      continue;
    } else if (
      liquidityPositions.length === 1 &&
      liquidityPositions[0].pair.id === requestedPool
    ) {
      pool = liquidityPositions[0];
    } else {
      for (let k = 0; k < liquidityPositions.length; k++) {
        if (liquidityPositions[k].pair.id === requestedPool) {
          pool = liquidityPositions[k];
        }
      }
    }
    if (pool) {
      const pricePerLPToken =
        pool.pair.reserveUSD / pool.pair.totalSupply;

      userPositionByDay.push({
        day: i + 1,
        userLiquidityUSD:
          pool.liquidityTokenBalance * pricePerLPToken,
      });
    }
    blockNumber -= 5760;
  }
  return userPositionByDay;
};
