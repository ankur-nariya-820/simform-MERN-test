import { toast } from "react-toastify";

import {
  ADD_TOAST
} from '../actionTypes';

export const addToast = (data: any) => ({
  type: ADD_TOAST,
  data
})

export const addSuccessToast = (data: any) => {
  return (dispatch: any) => {
    // Don't find any best solution for now, to add toast with redux so just add a dispatch method for now.
    dispatch(addToast(data));
    toast.success(data.message, {
      position: "top-right",
    });
  };
};

export const addErrorToast = (data: any) => {
  return (dispatch: any) => {
    dispatch(addToast(data))
    toast.error(data.message, {
      position: "top-right",
    });
  };
};