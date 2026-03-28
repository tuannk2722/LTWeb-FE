import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    quantityPeople: {
      type: Number,
      default: 1
    },
    workingTime: {
      type: String,
      default: ""
    },
    website: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    detail: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["incomplete", "active"],
      default: "incomplete", // 🔥 quan trọng
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);