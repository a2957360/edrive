import {
  FETCH_DATA_START,
  EMAIL_SEND_SUCCESS,
  EMAIL_GET_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case EMAIL_SEND_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
      };
    }

    case EMAIL_GET_SUCCESS: {
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
