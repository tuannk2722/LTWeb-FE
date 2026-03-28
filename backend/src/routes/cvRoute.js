import express from "express";
import { createCV, deleteCVById, getCVByCompanyId, getCVById, searchCV, updateStatusRead } from "../controllers/cvController.js";

const cvRouter = express.Router();

cvRouter.get("/detail/:id", getCVById);
cvRouter.get("/search/:companyId", searchCV);
cvRouter.get("/:companyId", getCVByCompanyId);
cvRouter.post("/create", createCV);
cvRouter.patch("/update/:id", updateStatusRead);
cvRouter.delete("/delete/:id", deleteCVById);

export default cvRouter;