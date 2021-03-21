import { batch } from "react-redux";
import {
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILED,
  ADD_FORM_LOADING,
  ADD_FORM_RESET
} from "../actionTypes";
import { API_PATH } from "../constants/api";

import httpService from "../services/httpService";

export const addFormSuccess = (data: any) => ({
  type: ADD_FORM_SUCCESS,
  data,
});

export const addFormFailed = () => ({
  type: ADD_FORM_FAILED,
});

export const setAddFormLoading = (data: any) => ({
  type: ADD_FORM_LOADING,
  data,
});

export const setAddFormReset = () => ({
  type: ADD_FORM_RESET,
});

export const addForm = (data: any) => {
  return (dispatch: any) => {
    dispatch(setAddFormLoading({ loading: true }));

    httpService
      .post(API_PATH.FORMS, data)
      .then((res) => {
        batch(() => {
          dispatch(addFormSuccess(res.data));
          dispatch(setAddFormLoading({ loading: false }));
        });
      })
      .catch((err) => {
        batch(() => {
          dispatch(addFormFailed());
          dispatch(setAddFormLoading({ loading: false }));
        });
      });
  };
};
