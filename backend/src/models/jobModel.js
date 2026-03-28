import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    salary: {
      type: String
    },

    description: {
      type: String
    },

    descriptionDetail: {
      type: String
    },

    benefits: [
      {
        type: String
      }
    ],

    requirements: [
      {
        type: String
      }
    ],

    status: {
      type: Boolean,
      default: false
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],

    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);