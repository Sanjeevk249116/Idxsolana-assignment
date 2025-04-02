const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const { profileDetails, readAllNotes, readSingleNote } = require("../controllers/notesController/read");
const { addNewNote } = require("../controllers/notesController/create");
const { deleteNote } = require("../controllers/notesController/delete");
const { updateNote } = require("../controllers/notesController/update");

const noteRouter = express.Router();

noteRouter.get("/profile",authenticateUser, profileDetails)
noteRouter.post("/",authenticateUser, addNewNote)
noteRouter.put("/:id",authenticateUser, updateNote)
noteRouter.get("/",authenticateUser, readAllNotes)
noteRouter.delete("/:id",authenticateUser, deleteNote)
noteRouter.get("/single-notes/:id",authenticateUser, readSingleNote)

module.exports = { noteRouter };