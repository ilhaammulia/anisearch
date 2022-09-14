import express from "express";
import {
  getAnimes,
  getAnimeByFilter,
  createAnime,
  updateAnime,
  deleteAnime,
} from "../controllers/AnimeController.js";

const router = express.Router();

router.get("/animes", getAnimes);
router.get("/animes/list", getAnimeByFilter);
router.post("/animes", createAnime);
router.patch("/animes/:id", updateAnime);
router.delete("/animes/:id", deleteAnime);

export default router;
