import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { addNewNote } from "../../../redux/action/noteMaking";

function NoteField() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { addNoteLoading } = useSelector((state) => state.note)
    const [makeNote, setMakeNote] = useState({
        title: "",
        content: "",
    });

    const validate = () => {
        if (makeNote.title === "" || makeNote.content === "") {
            return true;
        }
        return false;
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setMakeNote((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        dispatch(addNewNote(makeNote, navigate))
    }

    return (
        <div className="mt-2 flex column gap-1">
            <span className="flex column gap-7px">
                <p className="font-16px">Add Title :</p>
                <input
                    type="text"
                    name="title"
                    value={makeNote.title}
                    className={`input-tag-style input-width font-16px`}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </span>
            <span className="flex column gap-7px">
                <p className="font-16px">Add content :</p>
                <textarea
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
                    onChange={(e) => handleChange(e)}
                />
            </span>
            <div className={`mt-2 flex justify-center`}>
                <button
                    className={`button-style pointer font-20px ${validate() ? "disable-btn" : "submit-btn"
                        }`}
                    style={{
                        padding: "10px 55px",
                    }}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={validate() || addNoteLoading}
                >
                    {addNoteLoading ? (
                        <ClipLoader color="#fff" size={20} />
                    ) : (
                        "Next"
                    )}
                </button>
            </div>
        </div>
    );
}

export default NoteField;
