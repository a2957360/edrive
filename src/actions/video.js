import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  GET_VIDEO_SUCCESS,
  ADD_VIDEO_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getVideo = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "videoModule.php")
      .then(res => {
        dispatch({ type: GET_VIDEO_SUCCESS, payload: res.data });
      });
  };
};

export const addVideo = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "videoModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_VIDEO_SUCCESS, payload: res.data });
    });
  };
};