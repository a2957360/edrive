import {
  GET_BARRAGE_DATA_SUCCESS,
  ADD_BARRAGE_DATA_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BARRAGE_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_BARRAGE_DATA_SUCCESS: {
      return {
        ...state,
        message: action.payload
      };
    }

    default:
      return state;
  }
};
