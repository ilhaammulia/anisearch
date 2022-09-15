import express from "express";
import { getGenres, getGenreByFilter } from "../controllers/GenreController.js";

const router = express.Router();

router.get("/genres", getGenres);
router.get("/genres/list", getGenreByFilter);

export default router;
