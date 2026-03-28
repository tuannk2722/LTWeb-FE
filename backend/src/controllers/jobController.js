import mongoose from "mongoose";
import cityModel from "../models/cityModel.js";
import jobModel from "../models/jobModel.js"
import tagModel from "../models/tagModel.js";

// GET ALL JOB
export const getJobs = async (_, res) => {
  try {
    const jobs = await jobModel.find();
    res.json(jobs);
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
};

// GET ALL JOB 2
export const getJobs2 = async (_, res) => {
  try {

    const jobs = await jobModel
      .find()
      .populate("tags")
      .populate("cities")
      .populate("companyId");

    res.json(jobs);

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};

// GET JOB BY ID
export const getJobById = async (req, res) => {
  try {
    const job = await jobModel
      .findById(req.params.id)
      .populate("companyId")
      .populate("tags")
      .populate("cities");

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL JOB BY COMPANY ID
export const getJobByCompanyId = async (req, res) => {
  try {
    const jobs = await jobModel
      .find({ companyId: req.params.id })
      .populate("companyId")
      .populate("tags")
      .populate("cities");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const {
      name,
      salary,
      description,
      descriptionDetail,
      benefits,
      requirements,
      tags,
      city
    } = req.body;

    const companyId = req.cookies.id || req.body.companyId;
    const isLogin = req.cookies.isLogin;

    if (!companyId && !isLogin) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    // tìm tag ids
    const tagDocs = await tagModel.find({
      value: { $in: tags }
    });

    const tagIds = tagDocs.map(tag => tag._id);

    // tìm city ids
    const cityDocs = await cityModel.find({
      value: { $in: city }
    });

    const cityIds = cityDocs.map(c => c._id);

    const job = await jobModel.create({
      companyId,
      name,
      salary,
      description,
      descriptionDetail,
      benefits,
      requirements,
      tags: tagIds,
      cities: cityIds,
      status: false
    });

    res.status(201).json({
      message: "Create job success!",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// EDIT JOB
export const editJob = async (req, res) => {
  try {
    const {
      name,
      salary,
      description,
      descriptionDetail,
      benefits,
      requirements,
      tags,
      cities,
      status
    } = req.body;

    const jobId = req.params.id;

    const updateData = {
      name,
      salary,
      description,
      descriptionDetail,
      benefits,
      requirements,
      status
    };

    // xử lý tags
    if (tags && tags.length > 0) {
      const tagDocs = await tagModel.find({
        value: { $in: tags }
      });

      updateData.tags = tagDocs.map(tag => tag._id);
    }

    // xử lý cities
    if (cities && cities.length > 0) {
      const cityDocs = await cityModel.find({
        value: { $in: cities }
      });

      updateData.cities = cityDocs.map(city => city._id);
    }

    const job = await jobModel.findByIdAndUpdate(
      jobId,
      updateData,
      { new: true }
    )
      .populate("companyId")
      .populate("tags")
      .populate("cities");

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Update job success",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const searchJob = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { keyword } = req.query;

    const pipeline = [
      // 1. lọc theo company
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId)
        }
      },

      // 2. join tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags"
        }
      },

      // 3. join cities
      {
        $lookup: {
          from: "cities",
          localField: "cities",
          foreignField: "_id",
          as: "cities"
        }
      },

      // 4. search nếu có keyword
      ...(keyword && keyword.trim() !== ""
        ? [
          {
            $match: {
              $or: [
                // 🔍 tên job
                {
                  name: {
                    $regex: keyword,
                    $options: "i"
                  }
                },

                // 🔍 lương
                {
                  salary: {
                    $regex: keyword,
                    $options: "i"
                  }
                },

                // 🔍 tag
                {
                  "tags.value": {
                    $regex: keyword,
                    $options: "i"
                  }
                },

                // 🔍 thành phố
                {
                  "cities.name": {
                    $regex: keyword,
                    $options: "i"
                  }
                }
              ]
            }
          }
        ]
        : []),

      // 5. sort
      {
        $sort: { createdAt: -1 }
      }
    ];

    const jobs = await jobModel.aggregate(pipeline);

    return res.status(200).json({
      message: "Search job thành công",
      jobs: Array.isArray(jobs) ? jobs : []
    });

  } catch (error) {
    console.error("Search Job error:", error);

    return res.status(500).json({
      message: "Lỗi search job",
      error: error.message
    });
  }
};

// SEARCH JOBS GENERAL
export const searchJobsGeneral = async (req, res) => {
  try {
    const { keyword, city } = req.query;

    const pipeline = [
      // 1. filter status
      {
        $match: { status: true }
      },

      // 2. join tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags"
        }
      },

      // 3. join cities
      {
        $lookup: {
          from: "cities",
          localField: "cities",
          foreignField: "_id",
          as: "cities"
        }
      },

      // 4. join company
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "companyId"
        }
      },

      // 5. unwind company (since it's single)
      {
        $unwind: "$companyId"
      }
    ];

    // Add match for keyword
    if (keyword && keyword.trim() !== "") {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: keyword.trim(), $options: "i" } },
            { salary: { $regex: keyword.trim(), $options: "i" } },
            { description: { $regex: keyword.trim(), $options: "i" } },
            { descriptionDetail: { $regex: keyword.trim(), $options: "i" } },
            { "tags.value": { $regex: keyword.trim(), $options: "i" } }
          ]
        }
      });
    }

    // Add match for city
    if (city && city.trim() !== "") {
      pipeline.push({
        $match: {
          "cities.value": { $regex: city.trim(), $options: "i" }
        }
      });
    }

    // Sort
    pipeline.push({
      $sort: { createdAt: -1 }
    });

    const jobs = await jobModel.aggregate(pipeline);

    res.json(jobs);

  } catch (error) {
    console.error("Search Jobs General error:", error);
    res.status(500).json({ message: error.message });
  }
};