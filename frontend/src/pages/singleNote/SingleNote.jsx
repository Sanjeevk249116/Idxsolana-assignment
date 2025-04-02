import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteSingleNote,
  readSingleNote,
  updateSingleNote,
} from "../../redux/action/noteMaking";
import SpinnersLoading from "../comman/SpinnersLoading";
import { ClipLoader } from "react-spinners";

const SingleNote = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const { singleLoading, singleNoteData, deleteLoading } = useSelector(
    (state) => state.note
  );

  const handleUpdate = async () => {
    dispatch(
      updateSingleNote(id, { title: updatedTitle, content: updatedContent },setEditMode)
    );
  };

  const handleDelete = async () => {
    dispatch(deleteSingleNote(id, navigate));
  };

  useEffect(() => {
    dispatch(readSingleNote(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleNoteData) {
      setUpdatedTitle(singleNoteData?.title);
      setUpdatedContent(singleNoteData?.content);
    }
  }, [singleNoteData]);

  if (singleLoading) {
    return <SpinnersLoading />;
  }

  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h3>Single note details</h3>
      </span>
      <div className="single-note-container mt-1">
        {editMode ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className={`input-tag-style input-width font-16px`}
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="terms-textarea font-16px"
              rows="10"
              name="content"
              style={{
                width: "94%",
                padding: "1rem",
                height: "10%",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
              }}
            ></textarea>
            <div className="valign-wrapper gap-1 mt-2 justify-center">
              <button onClick={handleUpdate} className="note-button">
                {deleteLoading ? <ClipLoader color="#fff" size={20} /> : "Save"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="note-button cancel"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="note-title">{singleNoteData?.title}</h2>
            <p className="note-content">{singleNoteData?.content}</p>
            <div className="valign-wrapper mt-1 gap-1 justify-center">
              <button onClick={() => setEditMode(true)} className="note-button">
                Edit
              </button>
              <button onClick={handleDelete} className="note-button delete">
                {deleteLoading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleNote;
