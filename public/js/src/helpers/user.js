import axios from "axios";
import { blackListToken } from "../actions";
import Token from "./token";

export const setAuthHeaderAndErrorHandler = history => {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + Token.get(),
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  axios.interceptors.response.use(undefined, function(err) {
    if (err.response.status === 401) {
      Token.remove();
      history.push("/login");
    }
    return Promise.reject(err.response);
  });
};

export const removeUser = dispatch => {
  Token.remove();
  dispatch(blackListToken());
};
