import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import request from "./httpService";
import React from "react";
import { ERROR_MESSAGES, MESSAGES } from "../constants/api";
import { addErrorToast } from "../actions";

const Interceptor = () => {
  const dispatch = useDispatch();

  const handleError = useCallback(
    (error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorCode
      ) {
        const message = ERROR_MESSAGES.common.apiErrors.find(
          (item) => item.errorCode === error.response.data.errorCode,
        );
        if (message) {
          dispatch(
            addErrorToast({
              type: MESSAGES.toastConstants.error,
              message: message.message,
            }),
          );
        } else {
          dispatch(
            addErrorToast({
              type: MESSAGES.toastConstants.error,
              message: ERROR_MESSAGES.common.errorMessage,
            }),
          );
        }
      } else {
        dispatch(
          addErrorToast({
            type: MESSAGES.toastConstants.error,
            message: ERROR_MESSAGES.common.errorMessage,
          }),
        );
      }
      // Handle response error
      return Promise.reject(error);
    },
    [dispatch],
  );

  const interceptors = useMemo(
    () => ({
      request: (config: any) => {
        config.headers = {
          "Content-Type": "application/json",
        //   If authentication, we can handle here
        //   Authorization: `Bearer ${accessToken}`,
        };
        return config;
      },
      response: (response: any) => response,
      error: (error: any) => handleError(error),
    }),
    [handleError],
  );

  useEffect(() => {
    const reqInterceptor = request.interceptors.request.use(
      interceptors.request,
      interceptors.error,
    );
    const resInterceptor = request.interceptors.response.use(
      interceptors.response,
      interceptors.error,
    );
    return () => {
      request.interceptors.request.eject(reqInterceptor);
      request.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return null;
};

export default Interceptor;
