import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
    {
        key: {
            type: Number,
            required: true,
            unique: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("City", citySchema);