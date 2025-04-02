const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "userModels" },
  },
  { timestamps: true }
);

const notemodels = mongoose.model("notemodels", noteSchema);
module.exports={notemodels}