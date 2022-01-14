import {
  MAIN_DOMAIN,
  GET_COURSE_SUCCESS,
  FETCH_DATA_START,
  ADD_COURSE_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const getCourse = () => {
  return dispatch => {
    axios
      .get(MAIN_DOMAIN + "courseModule.php")
      .then(res => {
        dispatch({ type: GET_COURSE_SUCCESS, payload: res.data });
      });
  };
};

export const addCourse = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "courseModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data });
    });
  };
};

export const deleteCourse = (data) => {
  return dispatch => {
    dispatch({ type: FETCH_DATA_START });
    axios
    .post(MAIN_DOMAIN + "courseModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data });
    });
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