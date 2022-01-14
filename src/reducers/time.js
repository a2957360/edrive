import {
  MAIN_DOMAIN,
  FETCH_DATA_START,
  ADD_CLASS_SUCCESS,
  GET_TIME_SUCCESS,
  GET_STU_TIME_SUCCESS,
  ADD_TIME_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_TIME_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case GET_STU_TIME_SUCCESS: {
      return {
        ...state,
        studata: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_TIME_SUCCESS: {
      return {
        ...state,
        time: action.payload.time,
        // data: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_CLASS_SUCCESS: {
      return {
        ...state,
        studata: action.payload.data,
        message: action.payload.message
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
          stumessage:null
      };
    }
    default:
      return state;
  }
};
