import {
  ADD_QUESTION_SUCCESS,
  FETCH_DATA_START,
  GET_QUESTION_SUCCESS,
  GET_EXAM_QUESTION_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_QUESTION_SUCCESS: {
      return {
        ...state,
        questionData: action.payload.data,
        num: action.payload.number,
        list: action.payload.questionlist,
        examlist: action.payload.examlist,
        message: action.payload.message
      };
    }

    case GET_EXAM_QUESTION_SUCCESS: {
      return {
        ...state,
        examdata: action.payload.data,
        message: action.payload.message
      };
    }

    case ADD_QUESTION_SUCCESS: {
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
