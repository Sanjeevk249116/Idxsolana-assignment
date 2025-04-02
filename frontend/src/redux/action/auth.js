import { notifyError } from "../../helper/helper";
import { notebook } from "../config/urlConfig";

export const registerUser =
  (name, emailId, password, phoneNumber) => async (dispatch) => {
    dispatch({ type: "SHOW_LOADING" });
    try {
      const { data } = await notebook.post(`/auth/signup`, {
        name,
        emailId,
        password,
        phoneNumber,
      });
      localStorage.setItem("notes-token", data.accessToken);
      window.location.href = "/";
      dispatch({ type: "LOADING_SUCCESS" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      notifyError(
        error.response ? error.response?.data.message : error.message,
        error.response?.data?.statusCode
      );
    }
  };

export const signupUser = (userId, password) => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING" });
  try {
    const { data } = await notebook.post(`/auth/signin`, {
      userId,
      password,
    });
    localStorage.setItem("notes-token", data.accessToken);
    window.location.href = "/";
    dispatch({ type: "LOADING_SUCCESS" });
  } catch (error) {
    dispatch({ type: "HIDE_LOADING" });
    notifyError(
      error.response ? error.response?.data.message : error.message,
      error.response?.data?.statusCode
    );
  }
};
