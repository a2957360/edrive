import {
  MAIN_DOMAIN,
  DEL_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_STUDENT_USER_SUCCESS,
  CHANGE_USER_SUCCESS,
  CHANGE_LICENSE_SUCCESS,
  FETCH_DATA_START,
  FETCH_ALL_DATA_START
} from "../constants/actionTypes";
import axios from "axios";

export const delUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: DEL_USER_SUCCESS, payload: res.data });
    });
  };
};

export const getUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    });
  };
};

export const getStuUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_STUDENT_USER_SUCCESS, payload: res.data });
    });
  };
};

export const changeUser = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: CHANGE_USER_SUCCESS, payload: res.data });
    });
  };
};

export const changeLicense = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_ALL_DATA_START });
    axios
    .post(MAIN_DOMAIN + "userModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch({ type: CHANGE_LICENSE_SUCCESS, payload: res.data });
    });
  };
};
export const clearUser = () => {
  return dispatch => {
    dispatch({ type: FETCH_ALL_DATA_START });
  };
};