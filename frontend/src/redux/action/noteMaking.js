import { notifyError, notifySuccess } from "../../helper/helper";
import { notebook } from "../config/urlConfig";

export const addNewNote = (note, navigate) => async (dispatch) => {
  dispatch({ type: "ADD_NEW_NOTE_LOADING" });
  try {
    const { data } = await notebook.post(`/notes`, note);
    dispatch({ type: "ADD_NEW_NOTE_SUCCESS", payload: data });
    notifySuccess("Add new note succesfully.");
    navigate("/");
  } catch (error) {
    dispatch({ type: "ADD_NEW_NOTE_FAILED" });
    notifyError(
      error.response ? error.response?.data.message : error.message,
      error.response?.data?.statusCode
    );
  }
};

export const readAllNotes = () => async (dispatch) => {
  dispatch({ type: "READ_ALL_NOTE_LOADING" });
  try {
    const { data } = await notebook.get(`/notes`);
    dispatch({ type: "READ_ALL_NOTE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "READ_ALL_NOTE_FAILED" });
    notifyError(
      error.response ? error.response?.data.message : error.message,
      error.response?.data?.statusCode
    );
  }
};

export const readSingleNote = (id) => async (dispatch) => {
  dispatch({ type: "READ_SINGLE_NOTE_LOADING" });
  try {
    const { data } = await notebook.get(`/notes/single-notes/${id}`);
    dispatch({ type: "READ_SINGLE_NOTE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "READ_SINGLE_NOTE_FAILED" });
    notifyError(
      error.response ? error.response?.data.message : error.message,
      error.response?.data?.statusCode
    );
  }
};

export const deleteSingleNote = (id, navigate) => async (dispatch) => {
  dispatch({ type: "READ_SINGLE_NOTE_DELETE_LOADING" });
  try {
    const { data } = await notebook.delete(`/notes/${id}`);
    notifySuccess("Note deleted succesfully.");
    navigate("/");
    dispatch({ type: "READ_SINGLE_NOTE_DELETE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "READ_SINGLE_NOTE_DELETE_FAILED" });
    notifyError(
      error.response ? error.response?.data.message : error.message,
      error.response?.data?.statusCode
    );
  }
};

export const updateSingleNote =
  (id, updateNote, setEditMode) => async (dispatch) => {
    dispatch({ type: "READ_SINGLE_NOTE_DELETE_LOADING" });
    try {
      const { data } = await notebook.put(`/notes/${id}`, updateNote);
      notifySuccess("Note update succesfully.");
      setEditMode(false);
      dispatch(readSingleNote(id));
      dispatch({ type: "READ_SINGLE_NOTE_DELETE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "READ_SINGLE_NOTE_DELETE_FAILED" });
      notifyError(
        error.response ? error.response?.data.message : error.message,
        error.response?.data?.statusCode
      );
    }
  };
