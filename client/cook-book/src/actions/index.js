import axios from "axios";
import { userConstants } from "../constants";
import { BASE_URL } from "../config";

export const login = (payload) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/auth/login`, payload)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({
            type: userConstants.LOGIN_SUCCESS,
            payload: response,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          payload: error.response.data,
        });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: userConstants.LOGOUT_REQUEST,
    });
  };
};
