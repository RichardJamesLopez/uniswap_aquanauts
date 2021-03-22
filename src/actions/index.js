import { FETCH_DATA, FETCH_DATA_SUCCESS } from './actionTypes';

export const fetchData = () => ({
  type: FETCH_DATA,
});

export const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  data,
});
