import tagModel from "../models/tagModel.js";

// GET ALL 
export const getTags = async (_, res) => {
  try {
    const tags = await tagModel.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};