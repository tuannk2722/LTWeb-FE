import cvModel from "../models/cvModel.js";
import CV from "../models/cvModel.js";
import mongoose from "mongoose";

export const getCVById = async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await CV.findById(id)
      .populate("jobId")

    if (!cv) {
      return res.status(404).json({
        message: "CV not found"
      });
    }

    res.status(200).json({
      data: cv
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL CV BY COMPANY ID
export const getCVByCompanyId = async (req, res) => {
  try {

    const companyId = req.params.companyId;

    const cvs = await cvModel
      .find({ companyId: companyId })
      .populate("jobId")
      .populate("companyId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Get CV list success",
      cvs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE CV
export const createCV = async (req, res) => {
  try {

    const {
      fullName,
      email,
      phone,
      birthday,
      city,
      description,
      experience,
      certificate,
      activity,
      jobId,
      companyId
    } = req.body;

    const newCV = new cvModel({
      fullName,
      email,
      phone,
      birthday,
      city,
      description,
      experience,
      certificate,
      activity,
      jobId,
      companyId,
      statusRead: false
    });

    const savedCV = await newCV.save();

    res.status(201).json({
      message: "Apply job success!",
      cv: savedCV
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CHANGE STATUS READ
export const updateStatusRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusRead } = req.body;

    const cv = await CV.findByIdAndUpdate(
      id,
      { statusRead: statusRead },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({
        message: "CV not found"
      });
    }

    res.status(200).json({
      data: cv
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE CV BY ID
export const deleteCVById = async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await CV.findByIdAndDelete(id);

    if (!cv) {
      return res.status(404).json({
        message: "CV not found"
      });
    }

    res.status(200).json({
      message: "CV deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// SEARCH CV BY NAME JOB - aggregate version
export const searchCV = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { keyword } = req.query;

    const pipeline = [
      // 1. filter by companyId
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId)
        }
      },

      // 2. join job
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobId"
        }
      },

      // 3. unwind job (since single)
      {
        $unwind: "$jobId"
      }
    ];

    // 4. filter by keyword if provided
    if (keyword && keyword.trim() !== "") {
      pipeline.push({
        $match: {
          "jobId.name": {
            $regex: keyword.trim(),
            $options: "i"
          }
        }
      });
    }

    // 5. sort
    pipeline.push({
      $sort: { createdAt: -1 }
    });

    const cvs = await CV.aggregate(pipeline);

    return res.status(200).json({
      message: "Tìm kiếm CV thành công",
      cvs: Array.isArray(cvs) ? cvs : []
    });

  } catch (error) {
    console.error("Search CV error:", error);

    return res.status(500).json({
      message: "Lỗi tìm kiếm CV",
      error: error.message
    });
  }
};;;