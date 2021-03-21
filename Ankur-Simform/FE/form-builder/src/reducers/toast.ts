import { ADD_TOAST, REMOVE_TOAST } from "./../actionTypes";
import initialState from "./initialState";

export default function toast(state = initialState.toast, action: any) {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        isToast: true,
        toastType: action.data.type,
        message: action.data.message,
      };

    case REMOVE_TOAST:
      return {
        ...state,
        isToast: false,
        toastType: "",
        message: "",
      };

    default:
      return state;
  }
}
