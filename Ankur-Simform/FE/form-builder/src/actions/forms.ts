import { batch } from "react-redux";
import queryString from "query-string";
import {
  GET_FORMS_SUCCESS,
  GET_FORMS_FAILED,
  SET_FORMS_LOADING,
} from "../actionTypes";
import { API_PATH } from "../constants/api";

import httpService from "../services/httpService";

export const getFormsSuccess = (data: any) => ({
  type: GET_FORMS_SUCCESS,
  data,
});

export const getFormsFailed = () => ({
  type: GET_FORMS_FAILED,
});

export const setFormsLoading = (data: any) => ({
  type: SET_FORMS_LOADING,
  data,
});

export const getForms = (data: any) => {
  return (dispatch: any) => {
    dispatch(setFormsLoading({loading: true}));
    const { page, rowsPerPage, orderBy, order } = data;
    let path = queryString.stringifyUrl({
      url: API_PATH.FORMS,
      query: {
        page_number: page + 1,
        limit: rowsPerPage,
        sort: orderBy,
        sort_order: order.toUpperCase(),
      },
    });

    httpService
      .get(path)
      .then((res) => {
        batch(() => {
          dispatch(getFormsSuccess(res.data));
          dispatch(setFormsLoading({loading: false}));
        });
      })
      .catch((err) => {
        batch(() => {
          dispatch(getFormsFailed());
          dispatch(setFormsLoading({loading: false}));
        });
      });
  };
};
