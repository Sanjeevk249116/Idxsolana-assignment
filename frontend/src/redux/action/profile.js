import { notifyError } from "../../helper/helper";
import { notebook } from "../config/urlConfig";

export const userProfile = () => async (dispatch) => {
  dispatch({ type: "PROFILE_LOADING" });
  try {
    const { data } = await notebook.get(`/notes/profile`);
    dispatch({ type: "PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PROFILE_FAILED" });
    notifyError(
      error.response ? error.response?.data.message : error.message,
      error.response?.data?.statusCode
    );
  }
};
