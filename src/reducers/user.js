import {
  LOGIN_SUCCESS,
  FETCH_DATA_START,
  GET_USER_SUCCESS,
  DEL_USER_SUCCESS,
  GET_STUDENT_USER_SUCCESS,
  CHANGE_USER_SUCCESS,
  FETCH_ALL_DATA_START,
  CHANGE_LICENSE_SUCCESS,
  COACHSIGNUPSUCCESS,
  SIGNUPSUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        loginmessage: action.payload.message
      };
    }

    case SIGNUPSUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        signupmessage: action.payload.message
      };
    }

    case COACHSIGNUPSUCCESS: {
      return {
        ...state,
        coachsignupmessage: action.payload.message
      };
    }

    case GET_STUDENT_USER_SUCCESS: {
      return {
        ...state,
        studata: action.payload.data,
        message: action.payload.message
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case DEL_USER_SUCCESS: {
      return {
        ...state,
        delmessage: action.payload.message
      };
    }

    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        changemessage: action.payload.message
      };
    }

    case CHANGE_LICENSE_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        licensemessage: action.payload.message
      };
    }

    case FETCH_DATA_START: {
      return {
          ...state,
          message: null,
          loginmessage: null,
          signupmessage: null,
      };
    }

    case FETCH_ALL_DATA_START: {
      return {
          ...state,
          data: null,
          message: null,
          loginmessage: null,
          signupmessage: null,
          changemessage:null,
      };
    }
    default:
      return state;
  }
};
