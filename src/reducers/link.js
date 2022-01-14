import {
  MAIN_DOMAIN,
  ADD_LINK_SUCCESS,
  GET_LINK_SUCCESS,
  FETCH_DATA_START,
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_LINK_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
      };
    }

    case GET_LINK_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        showData: action.payload.showData,
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
