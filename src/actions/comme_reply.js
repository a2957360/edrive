import {
  MAIN_DOMAIN,
  ADD_COMMON_REPLY_SUCCESS,
  FETCH_DATA_START,
  GET_COMMON_REPLY_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getCommonReply = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "commonReplyModule.php")
      .then(res => {
        dispatch({ type: GET_COMMON_REPLY_SUCCESS, payload: res.data });
      });
  };
};

export const addCommonReply = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "commonReplyModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COMMON_REPLY_SUCCESS, payload: res.data });
    });
  };
};

export const deleteCommonReply = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "commonReplyModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COMMON_REPLY_SUCCESS, payload: res.data });
    });
  };
};

export const editCommonReply = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "commonReplyModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COMMON_REPLY_SUCCESS, payload: res.data });
    });
  };
};