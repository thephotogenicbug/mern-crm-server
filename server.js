import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "production";

const allowedOrigins = ["http://localhost:5173", process.env.PROD_URL];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    allowedOrigins,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${ENV} mode.`);
});
