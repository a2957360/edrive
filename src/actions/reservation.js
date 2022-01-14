import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  GET_RESERVATION_SUCCESS,
  ADD_RESERVATION_SUCCESS,
  CHANGE_RESERVATION_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getReservation = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "reservation.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_RESERVATION_SUCCESS, payload: res.data });
    });
  };
};

export const addReservation = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "reservation.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_RESERVATION_SUCCESS, payload: res.data });
    });
  };
};

export const changeReservation = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "reservation.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: CHANGE_RESERVATION_SUCCESS, payload: res.data });
    });
  };
};


export const clearReservation = () => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
  };
};
// export const editTranslate = (data) => {
//   return dispatch => {
//     dispatch({ type: FETCH_DATA_START });
//     axios
//     .post(MAIN_DOMAIN + "questionModule.php", data, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })
//     .then(res => {
//       dispatch({ type: ADD_QUESTION_SUCCESS, payload: res.data });
//     });
//   };
// };