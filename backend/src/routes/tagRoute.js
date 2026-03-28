import express from "express";
import { getTags } from "../controllers/tagController.js";

const tagRouter = express.Router();

tagRouter.get("/all", getTags);

export default tagRouter;