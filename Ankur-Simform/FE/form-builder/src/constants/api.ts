
export const BACKEND_API_URL = "http://localhost:4000/api/"

export const API_PATH = {
  FORMS: "forms",
  FORM: "form",
};

export const ERROR_MESSAGES = {
  common: {
    errorMessage: "Something went wrong.",
    apiErrors: [
      {
        errorCode: 4041,
        message: "Form not found.",
      },
      {
        errorCode: 4042,
        message: "Questions not found.",
      },
      {
        errorCode: 4001,
        message: "Request failed due to bad params in add form.",
      },
      {
        errorCode: 4002,
        message: "Request failed due to bad params in list forms.",
      },
      {
        errorCode: 4003,
        message: "Request failed due to bad params in get form.",
      },
      {
        errorCode: 4004,
        message: "Request failed due to bad params in submit form.",
      }
    ],
  },
};

export const MESSAGES = {
  toastConstants: {
    error: "error",
    success: "success",
  },
};

