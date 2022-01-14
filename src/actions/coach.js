import {
  MAIN_DOMAIN,
  GET_COACH_SUCCESS,
  GET_COACH_LIST_SUCCESS,
  GET_COACH_BALANCE_SUCCESS,
  ADD_COACH_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";


export const getCoach = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_COACH_SUCCESS, payload: res.data });
    });
  };
};

export const getCoachList = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "coachModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_COACH_LIST_SUCCESS, payload: res.data });
    });
  };
};

export const getCoachBalance = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "coachModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_COACH_BALANCE_SUCCESS, payload: res.data });
    });
  };
};

export const changeCoach = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COACH_SUCCESS, payload: res.data });
    });
  };
};
