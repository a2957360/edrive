import {
  MAIN_DOMAIN,
  ADD_LINK_SUCCESS,
  GET_LINK_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";

export const getLink = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "linkModule.php")
      .then(res => {
        dispatch({ type: GET_LINK_SUCCESS, payload: res.data });
      });
  };
};

export const addLink = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "linkModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_LINK_SUCCESS, payload: res.data });
    });
  };
};
