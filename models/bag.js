const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BagSchema = new Schema(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
        capacity: { type: Number, required: true },
        icon: { type: String },
        discs: [{ type: Schema.Types.ObjectId, ref: "Disc" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bag", BagSchema);