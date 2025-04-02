const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("./routers/authRouters");
const { ApiError } = require("./utils/apiError");
const { noteRouter } = require("./routers/noteRouter");

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/auth", router);
app.use("/notes", noteRouter);
app.use((req, res) => {
  return res
    .status(400)
    .json(new ApiError(400, "The requested url is not found."));
});

module.exports = { app };
