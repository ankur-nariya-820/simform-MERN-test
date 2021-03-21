import {
  UPDATE_DRAFT_QUESTIONS,
  RESET_QUESTIONS
} from "../actionTypes";
import initialState from "./initialState";

export default function questionsReducer(
  state = initialState.questions,
  action: any,
) {
  switch (action.type) {
    case UPDATE_DRAFT_QUESTIONS:
      return {
        ...state,
        draftQuestions: action.data
      };

    case RESET_QUESTIONS:
      return {
        ...state,
        draftQuestions: []
      };

    default:
      return state;
  }
}
