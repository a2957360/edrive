import {
  MAIN_DOMAIN,
  GET_WEBSITEINFO_SUCCESS,
  ADD_WEBSITEINFO_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";
import axios from "axios";

export const getWebsiteInfo = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "websiteInfoModule.php")
      .then(res => {
        dispatch({ type: GET_WEBSITEINFO_SUCCESS, payload: res.data });
      });
  };
};

export const addWebsiteInfo = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "websiteInfoModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_WEBSITEINFO_SUCCESS, payload: res.data });
    });
  };
};
