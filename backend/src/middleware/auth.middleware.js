const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.header("note-token");
  
  if (!token) {
    return res
      .status(401)
      .json(new ApiError(401, "Access denied! Token not provided."));
  }

  try {
    const decodedUserToken = jwt.verify(token, process.env.ACCESS_TOKEN_VALUE);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedUserToken.exp && decodedUserToken.exp < currentTime) {
      return res
        .status(403)
        .json(new ApiError(401, "Token expired. Please refresh your token."));
    }

    req.userId = decodedUserToken._id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(new ApiError(401, "Token expired. Please refresh your token."));
    } else {
      return res.status(401).json(new ApiError(401, "Invalid token"));
    }
  }
});

module.exports = { authenticateUser };
