const { userModels } = require("../../model/user.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const { checkMissingFields } = require("../../utils/checkMissingField");
const { sendMailToUser } = require("../../utils/sendMail");

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
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailId,
    subject: "Welcome to NoteSphere!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 
            auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="text-align: center; color: #4CAF50;">Welcome to NoteSphere! 📝</h2>
        <p>Hello ${name},</p>
        <p>We're excited to have you on board! With NoteSphere, you can easily create, manage, and organize your notes all in one place.</p>
  
        <h3 style="color: #4CAF50;">Your Account Details:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email ID:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${emailId}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Temporary Password:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong style="color: red;">${password}</strong></td>
          </tr>
        </table>
  
        <p>🔐 <strong>Security Tip:</strong> Please change your password immediately after logging in to keep your account secure.</p>
        
        <p>✨ Start organizing your thoughts and ideas effortlessly. If you have any questions, feel free to reach out to our support team.</p>
  
        <p>Happy Note-Making!<br><strong> Sanjeev Kushwaha & Team</strong></p>
      </div>
    `,
  };
  await sendMailToUser(mailOptions);
  res.status(200).json(new ApiResponse(200, accessToken));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Email or phone number and password are required")
      );
  }

  const existUser = await userModels.findOne({
    $or: [{ email: userId }, { phoneNumber: userId }],
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
