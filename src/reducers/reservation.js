import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  GET_RESERVATION_SUCCESS,
  ADD_RESERVATION_SUCCESS,
  CHANGE_RESERVATION_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {message:null};

export default (state = INIT_STATE, action) => {
  
  switch (action.type) {

    case GET_RESERVATION_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_RESERVATION_SUCCESS: {
      return {
        ...state,
        changedata: action.payload.data,
        message: action.payload.message
      };
    }

    case CHANGE_RESERVATION_SUCCESS: {
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
