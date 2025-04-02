import React from "react";
import { useNavigate } from "react-router-dom";
import NoteField from "../children/NoteField";

function AddNewNote() {
    const navigate = useNavigate();

    return (
        <div className="mt-1">
            <span className="valign-wrapper gap-1">
                <span
                    className="material-icons-outlined pointer"
                    onClick={() => navigate(-1)}
                >
                    arrow_back
                </span>
                <h3>Auction Details</h3>
            </span>
            <NoteField />
        </div>
    );
}

export default AddNewNote;
