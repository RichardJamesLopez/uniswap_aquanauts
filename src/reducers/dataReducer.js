import {
  FETCH_DATA_SUCCESS,
  RESET_RESULTS_TO_DEFAULT_STATE
} from "../actions/actionTypes";

const INITIAL_STATE = {
  data: {},
};

function dataReducer(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...data,
      };
    case RESET_RESULTS_TO_DEFAULT_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default dataReducer;
