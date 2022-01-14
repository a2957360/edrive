import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  GET_COUPON_SUCCESS,
  ADD_COUPON_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getCoupon = (data) => {
  console.log("1111");
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "couponModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_COUPON_SUCCESS, payload: res.data });
    });
  };
};

export const addCoupon = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "couponModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COUPON_SUCCESS, payload: res.data });
    });
  };
};

// export const changeReservation = (data) => {
//   return dispatch => {
//     dispatch({ type: FETCH_DATA_START });
//     axios
//     .post(MAIN_DOMAIN + "reservation.php", data, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })
//     .then(res => {
//       dispatch({ type: CHANGE_RESERVATION_SUCCESS, payload: res.data });
//     });
//   };
// };

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