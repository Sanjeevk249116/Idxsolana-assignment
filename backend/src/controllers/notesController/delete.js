const { notemodels } = require("../../model/note.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const note = await notemodels.findByIdAndDelete(id);
      if (!note) {
        return res.status(404).json(new ApiError(404, "Note not found"));
      }
      return res.status(200).json(new ApiResponse(200, "Deleted successfully."));
    } catch (error) {
      return res.status(500).json(new ApiError(500, "Failed to delete note", error.message));
    }
  });

module.exports = { deleteNote };
