import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  RESET_RESULTS_TO_DEFAULT_STATE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  userLiquidityData: [],
  liquidutyByPoolData: [],
  loading: false,
};

function dataReducer(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...data,
        loading: false,
      };
    case RESET_RESULTS_TO_DEFAULT_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default dataReducer;
