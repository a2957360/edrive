import {
  MAIN_DOMAIN,
  ADD_MESSAGE_SUCCESS,
  GET_MESSAGE_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";

export const getMessage = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "messageModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_MESSAGE_SUCCESS, payload: res.data });
    });
  };
};

export const addMessage = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "messageModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_MESSAGE_SUCCESS, payload: res.data });
    });
  };
};
