import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  GET_COUPON_SUCCESS,
  ADD_COUPON_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_COUPON_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_COUPON_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        addmessage: action.payload.message
      };
    }

    // case CHANGE_RESERVATION_SUCCESS: {
    //   return {
    //     ...state,
    //     message: action.payload.message
    //   };
    // }

    case FETCH_DATA_START: {
      return {
          ...state,
          message: null,
          addmessage: null,
      };
    }
    default:
      return state;
  }
};
