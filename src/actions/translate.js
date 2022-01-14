import {
  MAIN_DOMAIN,
  ADD_TRANSLATE_SUCCESS,
  FETCH_DATA_START,
  FILL_TRANSLATE_SUCCESS,
  FINISH_TRANSLATE_SUCCESS,
  GET_TRANSLATE_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getTranslate = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    console.log(data);
    axios
    .post(MAIN_DOMAIN + "translateModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GET_TRANSLATE_SUCCESS, payload: res.data });
    });
  };
};

export const clearTranslate = () => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
  };
};

export const addTranslate = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "translateModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_TRANSLATE_SUCCESS, payload: res.data });
    });
  };
};

export const finishTranslate = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "translateModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: FINISH_TRANSLATE_SUCCESS, payload: res.data });
    });
  };
};

// export const deleteTranslate = (data) => {
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