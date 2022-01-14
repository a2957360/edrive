import {
  MAIN_DOMAIN,
  GET_COURSE_SUCCESS,
  FETCH_DATA_START,
  ADD_COURSE_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_COURSE_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_COURSE_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
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
