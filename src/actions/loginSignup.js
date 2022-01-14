import {
  MAIN_DOMAIN,
  LOGIN_SUCCESS,
  SIGNUPSUCCESS,
  COACHSIGNUPSUCCESS,
  FETCH_DATA_START,
  POP_UP_SIGNUP_ON,
  POP_UP_SIGNUP_OFF
} from "../constants/actionTypes";
import axios from "axios";


export const signupUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "loginSignup.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SIGNUPSUCCESS, payload: res.data });
    });
  };
};

export const coachsignupUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "loginSignup.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: COACHSIGNUPSUCCESS, payload: res.data });
    });
  };
};

export const loginUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "loginSignup.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    });
  };
};

export const popUpSignupOn = () => {
  return dispatch => {
    dispatch({ type: POP_UP_SIGNUP_ON });
  };
};

export const popUpSignupOff = () => {
  return dispatch => {
    dispatch({ type: POP_UP_SIGNUP_OFF });
  };
};
