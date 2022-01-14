import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  ADD_CLASS_SUCCESS,
  GET_TIME_SUCCESS,
  GET_STU_TIME_SUCCESS,
  ADD_TIME_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

import { getUser,getStuUser } from './user';

export const getTime = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "timeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_TIME_SUCCESS, payload: res.data });
    });
  };
};

export const getStuTime = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "timeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_STU_TIME_SUCCESS, payload: res.data });
    });
  };
};

export const addTime = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "timeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_TIME_SUCCESS, payload: res.data });
      dispatch(getTime({ isGet: 1, userId: data.userId, coachId: data.coachId }));
    });
  };
};

export const addTimeReview = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "timeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      let senddata = { "isGet": 1, "userId": data.get('reviewUserId') };
      dispatch(getUser(senddata));
    });
  };
};

export const addCoachTimeReview = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "timeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      let senddata = { "isGet": 1, "userId": data.get('reviewUserId') };
      dispatch(getStuUser(senddata));
    });
  };
};

export const addClassTime = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "timeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_CLASS_SUCCESS, payload: res.data });
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