const { notemodels } = require("../../model/note.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { checkMissingFields } = require("../../utils/checkMissingField");

const addNewNote = asyncHandler(async (req, res) => {
  const requiredFields = ["title", "content"];
  const missingFields = checkMissingFields(req.body, requiredFields);
  
  if (missingFields.length > 0) {
    return res.status(400).json(
      new ApiError(400, `The following fields are missing or empty: ${missingFields.join(", ")}`)
    );
  }
  
  const { title, content } = req.body;
  const userId = req.userId;
  
  try {
    const newNote = await notemodels.create({ title, content, userId });
    return res.status(201).json(new ApiResponse(201, newNote));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Failed to create note", error.message));
  }
});

module.exports = { addNewNote };
