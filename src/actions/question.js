import {
  MAIN_DOMAIN,
  ADD_QUESTION_SUCCESS,
  GET_EXAM_QUESTION_SUCCESS,
  FETCH_DATA_START,
  GET_QUESTION_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getQuestion = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "questionModule.php")
      .then(res => {
        dispatch({ type: GET_QUESTION_SUCCESS, payload: res.data });
      });
  };
};

export const getExamQuestion = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "questionModule.php?exam=1")
      .then(res => {
        dispatch({ type: GET_EXAM_QUESTION_SUCCESS, payload: res.data });
      });
  };
};

export const addQuestion = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "questionModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_QUESTION_SUCCESS, payload: res.data });
    });
  };
};

export const deleteQuestion = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "questionModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_QUESTION_SUCCESS, payload: res.data });
    });
  };
};

export const editQuestion = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "questionModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_QUESTION_SUCCESS, payload: res.data });
    });
  };
};