import {
  MAIN_DOMAIN,
  ADD_PRICE_SUCCESS,
  GET_PRICE_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_PRICE_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
      };
    }

    case GET_PRICE_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        list: action.payload.list,
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
