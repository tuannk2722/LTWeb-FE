import express from "express";
import { getCompanies, getCompanyById, updateCompany } from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.get("/all", getCompanies);
companyRouter.get("/:id", getCompanyById);
companyRouter.patch("/update/:id", updateCompany);

export default companyRouter;