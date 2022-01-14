import {
  MAIN_DOMAIN,
  ADD_RATE_SUCCESS,
  GET_RATE_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";

export const getRate = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "rateListModule.php")
      .then(res => {
        dispatch({ type: GET_RATE_SUCCESS, payload: res.data });
      });
  };
};

export const addRate = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "rateListModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_RATE_SUCCESS, payload: res.data });
    });
  };
};

export const deleteRate = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "rateListModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_RATE_SUCCESS, payload: res.data });
    });
  };
};
