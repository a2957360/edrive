import {
  GET_BARRAGE_DATA_SUCCESS,
  ADD_BARRAGE_DATA_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

let MainDomain = 'http://app.ukin.ca/newapp/live/';

export const getBarrageData = () => {
  return dispatch => {
    axios
      .get("http://kiwe.finestudiodemo.com/getTerm.php")
      .then(res => {
        dispatch({ type: GET_BARRAGE_DATA_SUCCESS, payload: res.data });
      });
  };
};

export const addBarrageData = (data) => {
  return dispatch => {
    axios
    .post(MainDomain + "cancel_attend_event.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_BARRAGE_DATA_SUCCESS, payload: res.data });
    });
  };
};