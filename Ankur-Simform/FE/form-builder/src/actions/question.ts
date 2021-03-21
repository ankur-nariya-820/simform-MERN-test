import {
  UPDATE_DRAFT_QUESTIONS,
  RESET_QUESTIONS
} from "../actionTypes";

export const updateQuestions = (data: any) => ({
  type: UPDATE_DRAFT_QUESTIONS,
  data,
});

export const resetQuestions = () => ({
  type: RESET_QUESTIONS,
});
