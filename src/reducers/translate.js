import {
  ADD_TRANSLATE_SUCCESS,
  FETCH_DATA_START,
  FILL_TRANSLATE_SUCCESS,
  FINISH_TRANSLATE_SUCCESS,
  GET_TRANSLATE_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {
  message:null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_TRANSLATE_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case FILL_TRANSLATE_SUCCESS: {
      return {
        ...state,
        filldata: action.payload
      };
    }

    case ADD_TRANSLATE_SUCCESS: {
      return {
        ...state,
        adddata: action.payload.data,
        message: action.payload.message
      };
    }

    case FINISH_TRANSLATE_SUCCESS: {
      return {
        ...state,
        finishmessage: action.payload.message
      };
    }

    case FETCH_DATA_START: {
      return {
          ...state,
          finishmessage: null,
          message: null,
      };
    }
    default:
      return state;
  }
};
