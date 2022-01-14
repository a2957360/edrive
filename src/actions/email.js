import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  EMAIL_SEND_SUCCESS,
  EMAIL_GET_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const sendEmail = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "sendemail.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      let data = {isGet:"1"};
      dispatch(getEmail(data));
      // dispatch({ type: EMAIL_SEND_SUCCESS, payload: res.data });
    });
  };
};

export const getEmail = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "sendemail.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: EMAIL_GET_SUCCESS, payload: res.data });
    });
  };
};


