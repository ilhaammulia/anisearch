import express from "express";
import { getGenres } from "../controllers/GenreController.js";

const router = express.Router();

router.get("/genres", getGenres);

export default router;
