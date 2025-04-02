const { notemodels } = require("../../model/note.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { checkMissingFields } = require("../../utils/checkMissingField");

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const requiredFields = ["title", "content"];
  const missingFields = checkMissingFields(req.body, requiredFields);
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          `The following fields are missing or empty: ${missingFields.join(
            ", "
          )}`
        )
      );
  }

  const { title, content } = req.body;
  const userId = req.userId;

  const existingNote = await notemodels.findById(id);
  if (!existingNote) {
    return res.status(404).json(new ApiError(404, "Note not found"));
  }
  if (existingNote.userId.toString() !== userId) {
    return res
      .status(403)
      .json(new ApiError(403, "Unauthorized to update this note"));
  }

  const updatedNote = await notemodels.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, updatedNote));
});

module.exports = { updateNote };
