import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "recruiter",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);