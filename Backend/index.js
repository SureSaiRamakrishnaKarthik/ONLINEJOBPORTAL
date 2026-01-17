import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://onlinejobportal-frontend.onrender.com",
    "https://onlinejobportal-1.onrender.com",
    "https://onlinejobportal-red.vercel.app",
    "https://onlinejobportal.vercel.app",
    "https://onlinejobportal-git-main.vercel.app",
  ],
  credentials: false,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

//api's
app.get("/", (req, res) => {
  res.json({ message: "Online Job Portal Backend API is running!" });
});

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
