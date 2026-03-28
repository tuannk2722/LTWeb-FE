import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true
    },

    birthday: {
      type: Number,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    experience: {
      type: String
    },

    certificate: {
      type: String
    },

    activity: {
      type: String
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    statusRead: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);

export default mongoose.model("CV", cvSchema);