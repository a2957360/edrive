import {
  MAIN_DOMAIN,
  GET_STUDENT_SUCCESS,
  ADD_STUDENT_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";


export const getStudent = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "studentModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_STUDENT_SUCCESS, payload: res.data });
    });
  };
};

export const addStudent = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "studentModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_STUDENT_SUCCESS, payload: res.data });
    });
  };
};
