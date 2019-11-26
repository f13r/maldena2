import axios from "axios";

export const userLogin = action => ({
  type: "USER_LOGIN",
  ...action
});

export const userLogout = () => ({
  type: "USER_LOGOUT"
});

export const fetchUser = () => {
  return dispatch => {
    return axios.get("/api/me").then((res, rej) => {
      dispatch(userLogin(res.data));
    });
  };
};

export const blackListToken = () => {
  return dispatch => {
    axios.get("/api/logout").then((res, rej) => {
      dispatch(userLogout(res.data));
    });
  };
};
