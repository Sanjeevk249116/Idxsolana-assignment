import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllNotes } from "../../../redux/action/noteMaking";
import { useNavigate } from "react-router-dom";
import NoteSkeleton from "../../comman/NoteSkeleton";

function ViewAllNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allnotes, addNoteLoading } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(readAllNotes());
  }, [dispatch]);

  return (
    <div className="note-list-container">
      {addNoteLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <NoteSkeleton key={index} />
          ))
        : allnotes?.map((note) => (
            <div key={note._id} className="note-card pointer pin-top">
              <h3 className="note-title">{note.title}</h3>
              <p className="note-content">{note.content}</p>
              <p className="note-date mb-3">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <button
                className="cercle-purple-text select-label pointer"
                style={{
                  border: "1px solid #6f2da8",
                  top: "80%",
                  left: "45%",
                  borderRadius: "30px",
                  padding: "4px 30px",
                }}
                onClick={() => navigate(`/single-note/${note?._id}`)}
              >
                Details
              </button>
            </div>
          ))}
    </div>
  );
}

export default ViewAllNote;
