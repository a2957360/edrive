import {
  GET_COMMON_REPLY_SUCCESS,
  FETCH_DATA_START,
  ADD_COMMON_REPLY_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_COMMON_REPLY_SUCCESS: {
      return {
        ...state,
        list: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_COMMON_REPLY_SUCCESS: {
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
