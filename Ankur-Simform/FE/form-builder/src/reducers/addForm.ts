import {
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILED,
  ADD_FORM_LOADING,
  ADD_FORM_RESET
} from "./../actionTypes";
import initialState from "./initialState";

export default function addFormReducer(
  state = initialState.addForm,
  action: any,
) {
  switch (action.type) {
    case ADD_FORM_SUCCESS:
      return {
        ...state,
        success: true
      };

    case ADD_FORM_FAILED:
      return {
        ...state,
        success: false
      };

    case ADD_FORM_LOADING:
      return {
        ...state,
        loading: action.data.loading,
      };
    
    case ADD_FORM_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };

    default:
      return state;
  }
}
