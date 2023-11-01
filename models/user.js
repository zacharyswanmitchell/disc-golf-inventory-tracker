const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shelfSchema = new Schema(
  {
    discs: [{ type: Schema.Types.ObjectId, ref: "Disc" }],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    bags: [{ type: Schema.Types.ObjectId, ref: "Bag" }],
    shelf: { type: shelfSchema, default: { discs: [] } },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
