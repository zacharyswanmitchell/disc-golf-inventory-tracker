const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    googleId: String,
    bags: [{ type: Schema.Types.ObjectId, ref: "Bag" }],
    shelf: { type: Schema.Types.ObjectId, ref: "Bag" }, // Add a shelf property that references a Bag model
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
