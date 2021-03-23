import { gql } from "@apollo/client";

const ENDPOINT = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

const requestUniSubgraph = query => {
  return fetch(ENDPOINT, query)
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

  const result = await requestUniSubgraph(query);
  const uniLiquidityByDay = result.uniswapDayDatas.map(x => {
    return {
      date: dateFromUnix(x.date),
      liquidity: x.totalLiquidityUSD
    };
  });
  return result;
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

  const result = await requestUniSubgraph(query);
  const poolLiquidityByDay = result.pairDayDatas.map(x => {
    return {
      date: dateFromUnix(x.date),
      liquidity: x.reserveUSD
    };
  });
  return result;
};

export const userLiquidity = async (userAddress, requestedPool, numDays, blockNumber) => {
  const userPositionByDay = [];
  let blockNumber = (await library.getBlockNumber()) - 10;

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

    const result = await requestUniSubgraph(query);

    if (result.user.liquidityPositions.length === 0) {
      continue;
    } else if (
      result.user.liquidityPositions.length === 1 &&
      result.user.liquidityPositions[0].pair.id === requestedPool
    ) {
      pool = result.user.liquidityPositions[0];
    } else {
      for (let k = 0; k < result.user.liquidityPositions.length; k++) {
        if (result.user.liquidityPositions[k].pair.id === requestedPool) {
          pool = result.user.liquidityPositions[k];
        }
      }
    }

    const pricePerLPToken = pool.pair.reserveUSD / pool.pair.totalSupply;

    userPositionByDay.push({
      day: i + 1,
      userLiquidityUSD: pool.liquidityTokenBalance * pricePerLPToken
    });
    blockNumber -= 5760;
  }
  return userPositionByDay;
};
