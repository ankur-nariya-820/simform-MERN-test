import {
  GET_FORMS_SUCCESS,
  GET_FORMS_FAILED,
  SET_FORMS_LOADING,
} from "./../actionTypes";
import initialState from "./initialState";

export default function formsReducer(
  state = initialState.forms,
  action: any,
) {
  switch (action.type) {
    case GET_FORMS_SUCCESS:
      return {
        ...state,
        data: action.data.forms,
        total: action.data.total,
      };

    case GET_FORMS_FAILED:
      return {
        ...state,
        data: [],
        total: 0,
      };

    case SET_FORMS_LOADING:
      return {
        ...state,
        loading: action.data.loading,
      };

    default:
      return state;
  }
}
