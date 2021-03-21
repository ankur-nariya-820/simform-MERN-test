import { combineReducers } from "redux";

import toast from "./toast";
import forms from "./forms";
import addForm from "./addForm";
import questions from "./question";
import fillupForm from "./fillupForm";

const appReducer = combineReducers({
  toast,
  forms,
  addForm,
  questions,
  fillupForm
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
