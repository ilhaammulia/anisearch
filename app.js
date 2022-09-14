import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AnimeRoute from "./routes/AnimeRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(AnimeRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running....");
});
