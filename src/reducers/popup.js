import {
  POP_UP_SIGNUP_ON,
  POP_UP_SIGNUP_OFF
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case POP_UP_SIGNUP_ON: {
      return {
        ...state,
        popup: true
      };
    }

    case POP_UP_SIGNUP_OFF: {
      return {
          ...state,
          popup: null,
      };
    }

    default:
      return state;
  }
};
