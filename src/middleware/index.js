import { FETCH_DATA } from '../actions/actionTypes';
import { fetchDataSuccess } from '../actions';
import {
  liquidityQuery,
  liquidutyByPoolQuery,
  userLiquidity,
} from './queries';

import { timeframe, userAddress, requestedPool } from './test';

export const apiMiddleware = store => next => async action => {
  if (action.type === FETCH_DATA) {
    try {
      const userLiquidityData = await userLiquidity(
        userAddress,
        requestedPool,
        7,
      );
      const liquidutyByPoolData = await liquidutyByPoolQuery(
        timeframe,
        requestedPool,
      );
      const data = {
        userLiquidityData: userLiquidityData || {},
        liquidutyByPoolData,
      };
      return next(fetchDataSuccess(data));
    } catch (e) {
      console.log('middleware error', e);
    }
  }
  return next(action);
};

export default apiMiddleware;
