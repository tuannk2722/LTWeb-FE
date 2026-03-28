import companyModel from "../models/companyModel.js";


// GET ALL
export const getCompanies = async (req, res) => {
  try {
    const companies = await companyModel.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ONE ================= */
export const getCompanyById = async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateCompany = async (req, res) => {
  try {
    const company = await companyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};