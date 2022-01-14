import {
  MAIN_DOMAIN,
  ADD_RATE_SUCCESS,
  GET_RATE_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_RATE_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
      };
    }

    case GET_RATE_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
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
