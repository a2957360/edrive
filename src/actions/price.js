import {
  MAIN_DOMAIN,
  ADD_PRICE_SUCCESS,
  GET_PRICE_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";

export const getPrice = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "priceModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_PRICE_SUCCESS, payload: res.data });
    });
  };
};

export const addPrice = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "priceModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_PRICE_SUCCESS, payload: res.data });
    });
  };
};
