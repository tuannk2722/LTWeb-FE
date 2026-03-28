import express from "express";
import { getCities } from "../controllers/cityController.js";

const cityRouter = express.Router();

cityRouter.get("/all", getCities);

export default cityRouter;