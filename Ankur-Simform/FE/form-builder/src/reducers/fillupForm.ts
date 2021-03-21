import {
  FILL_UP_FORM_SUCCESS,
  FILL_UP_FORM_FAILED,
  FILL_UP_FORM_LOADING,
  FILL_UP_FORM_RESET,
  GET_FORM_SUCCESS,
  GET_FORM_FAILED,
  GET_FORM_LOADING,
  GET_FORM_RESET
} from "./../actionTypes";
import initialState from "./initialState";

export default function fillupFormReducer(
  state = initialState.fillupForm,
  action: any,
) {
  switch (action.type) {
    case FILL_UP_FORM_SUCCESS:
      return {
        ...state,
        success: true
      };

    case FILL_UP_FORM_FAILED:
      return {
        ...state,
        success: false
      };

    case FILL_UP_FORM_LOADING:
      return {
        ...state,
        loading: action.data.loading,
      };

    case FILL_UP_FORM_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };

    case GET_FORM_SUCCESS:
      return {
        ...state,
        formData: action.data.form
      };

    case GET_FORM_FAILED:
      return {
        ...state,
        formData: {}
      };

    case GET_FORM_LOADING:
      return {
        ...state,
        formDataLoading: action.data.loading,
      };

    case GET_FORM_RESET:
      return {
        ...state,
        formDataLoading: false,
        formData: {}
      };

    default:
      return state;
  }
}
