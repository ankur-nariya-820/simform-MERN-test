import { batch } from "react-redux";
import queryString from "query-string";
import {
  FILL_UP_FORM_SUCCESS,
  FILL_UP_FORM_FAILED,
  FILL_UP_FORM_LOADING,
  FILL_UP_FORM_RESET,
  GET_FORM_SUCCESS,
  GET_FORM_FAILED,
  GET_FORM_LOADING,
  GET_FORM_RESET
} from "../actionTypes";
import { API_PATH } from "../constants/api";

import httpService from "../services/httpService";

export const submitFormSuccess = () => ({
  type: FILL_UP_FORM_SUCCESS,
});

export const submitFormFailed = () => ({
  type: FILL_UP_FORM_FAILED,
});

export const submitFormLoading = (data: any) => ({
  type: FILL_UP_FORM_LOADING,
  data,
});

export const submitFormReset = () => ({
  type: FILL_UP_FORM_RESET,
});

export const getFormSuccess = (data: any) => ({
  type: GET_FORM_SUCCESS,
  data,
});

export const getFormFailed = () => ({
  type: GET_FORM_FAILED,
});

export const getFormLoading = (data: any) => ({
  type: GET_FORM_LOADING,
  data,
});

export const getFormReset = () => ({
  type: GET_FORM_RESET,
});

export const submitForm = (data: any) => {
  return (dispatch: any) => {
    dispatch(submitFormLoading({ loading: true }));

    httpService
      .post(API_PATH.FORM, data)
      .then((res) => {
        batch(() => {
          dispatch(submitFormSuccess());
          dispatch(submitFormLoading({ loading: false }));
        });
      })
      .catch((err) => {
        batch(() => {
          dispatch(submitFormFailed());
          dispatch(submitFormLoading({ loading: false }));
        });
      });
  };
};

export const getForm = (formAccessToken: string) => {
  return (dispatch: any) => {
    dispatch(getFormLoading({loading: true}));
    let path = queryString.stringifyUrl({
      url: API_PATH.FORM,
      query: {
        formAccessToken
      },
    });

    httpService
      .get(path)
      .then((res) => {
        batch(() => {
          dispatch(getFormSuccess(res.data));
          dispatch(getFormLoading({loading: false}));
        });
      })
      .catch((err) => {
        batch(() => {
          dispatch(getFormFailed());
          dispatch(getFormLoading({loading: false}));
        });
      });
  };
};
