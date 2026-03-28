import express from "express";
import { createJob, editJob, getJobByCompanyId, getJobById, getJobs, getJobs2, searchJob, searchJobsGeneral } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.get("/all", getJobs);
jobRouter.get("/all2", getJobs2);
jobRouter.get("/search/:companyId", searchJob);
jobRouter.get("/search", searchJobsGeneral);
jobRouter.get("/:id", getJobById);
jobRouter.get("/company/:id", getJobByCompanyId);
jobRouter.post("/create", createJob);
jobRouter.patch("/edit/:id", editJob);

export default jobRouter;