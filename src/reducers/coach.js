import {
  LOGIN_SUCCESS,
  FETCH_DATA_START,
  GET_COACH_SUCCESS,
  GET_COACH_LIST_SUCCESS,
  GET_COACH_BALANCE_SUCCESS,
  ADD_COACH_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_COACH_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case GET_COACH_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_COACH_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        changemessage: action.payload.message
      };
    }

    case GET_COACH_BALANCE_SUCCESS: {
      return {
        ...state,
        balancedata: action.payload.data,
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
