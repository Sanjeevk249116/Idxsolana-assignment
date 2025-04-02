import { notebookUrl } from "./config";
import axios from "axios";

function getNoteBookUrl() {
  let notebook = axios.create(notebookUrl);
  const noteBookToken = localStorage.getItem("notes-token");

  if (noteBookToken)
    notebook.defaults.headers.common["note-token"] = noteBookToken;
  return notebook;
}

export const notebook = getNoteBookUrl();
