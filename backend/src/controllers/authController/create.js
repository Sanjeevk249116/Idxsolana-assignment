const { userModels } = require("../../model/user.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { checkMissingFields } = require("../../utils/checkMissingField");

const generateToken = async (userId) => {
  try {
    const user = await userModels.findOne(userId);
    const accessToken = await user.generateAuthenticationToken();
    user.accessToken = accessToken;
    user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    console.log(error);
    await userModels.findOneAndDelete(userId);
    throw new ApiError(500, "Internal server error while generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const requiredFields = ["emailId", "name", "password", "phoneNumber"];
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

  const { name, emailId, password, phoneNumber } = req.body;
  if (phoneNumber.length !== 10) {
    return res
      .status(400)
      .json(new ApiError(400, `Phone Number must be 10 digit.`));
  }
  const existUser = await userModels
    .findOne({ $or: [{ email: emailId }, { phoneNumber }] })
    .lean();

  if (existUser) {
    return res
      .status(400)
      .json(new ApiError(400, "Email or phone number are already registered."));
  }

  const user = await userModels.create({
    name,
    email: emailId,
    phoneNumber,
    password,
  });
  const accessToken = await generateToken(user._id);
  res.status(200).json(new ApiResponse(200, accessToken));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, phoneNumber, password } = req.body;
  if ((!email && !phoneNumber) || !password) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Email or phone number and password are required")
      );
  }

  const existUser = await userModels.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!existUser) {
    return res.status(400).json(new ApiError(400, "User does not exist."));
  }

  const correctPassword = await existUser.isPasswordCorrect(password);
  if (!correctPassword) {
    return res.status(200).json(new ApiError(400, "Invalid password"));
  }

  const accessToken = await generateToken(existUser._id);
  return res.status(200).json(new ApiResponse(200, accessToken));
});



module.exports = { registerUser, loginUser };
