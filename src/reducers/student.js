import {
  LOGIN_SUCCESS,
  FETCH_DATA_START,
  GET_STUDENT_SUCCESS,
  ADD_STUDENT_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_STUDENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_STUDENT_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        changemessage: action.payload.message
      };
    }

    case FETCH_DATA_START: {
      return {
          ...state,
          message: null,
      };
    }

    default:
      return state;
  }
};
