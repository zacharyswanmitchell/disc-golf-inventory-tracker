const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DiscSchema = new Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        type: { type: String, required: true },
        color: { type: String, required: true },
        icon: { type: String },
        speed: { type: Number},
        glide: { type: Number },
        turn: { type: Number },
        fade: { type: Number },
        weight: { type: Number },
        notes: { type: String },
        bag: { type: Schema.Types.ObjectId, ref: "Bag" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Disc", DiscSchema);