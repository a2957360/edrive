import {
  MAIN_DOMAIN,
  GET_WEBSITEINFO_SUCCESS,
  ADD_WEBSITEINFO_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_WEBSITEINFO_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
      };
    }

    case GET_WEBSITEINFO_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        usedata: action.payload.usedata,
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
