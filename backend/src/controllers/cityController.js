import cityModel from "../models/cityModel.js";

// GET ALL 
export const getCities = async (_, res) => {
  try {
    const cities = await cityModel.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};