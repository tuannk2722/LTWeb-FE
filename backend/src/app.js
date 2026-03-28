import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/userRoutes.js";
import companyRouter from "./routes/companyRoute.js";
import cityRouter from "./routes/cityRoute.js";
import tagRouter from "./routes/tagRoute.js";
import jobRouter from "./routes/jobRoute.js";
import cvRouter from "./routes/cvRoute.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Server đang chạy ngon lành!");
});

// Routes
app.use("/api/users", router);
app.use("/api/company", companyRouter);
app.use("/api/city", cityRouter);
app.use("/api/tag", tagRouter);
app.use("/api/job", jobRouter);
app.use("/api/cv", cvRouter);

export default app;