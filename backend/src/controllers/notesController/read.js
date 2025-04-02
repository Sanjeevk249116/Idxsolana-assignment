const { default: mongoose } = require("mongoose");
const { userModels } = require("../../model/user.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { notemodels } = require("../../model/note.model");

const profileDetails = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const profile = await userModels.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $project: {
        password: 0,
        accessToken: 0,
      },
    },
  ]);

  return res.status(200).json(new ApiResponse(200, profile[0]));
});

const readAllNotes = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const allNote = await notemodels.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        userId: 0,
      },
    },
  ]);

  return res.status(200).json(new ApiResponse(200, allNote));
});

const readSingleNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const singlenote = await notemodels.findById(id);

  if (!singlenote) {
    return res.status(404).json(new ApiError(404, null, "Note not found"));
  }

  return res.status(200).json(new ApiResponse(200, singlenote));
});

module.exports = { profileDetails, readAllNotes, readSingleNote };
