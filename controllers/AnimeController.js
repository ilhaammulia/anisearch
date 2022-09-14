import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnimes = async (req, res) => {
  try {
    const response = await prisma.anime.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimeByFilter = async (req, res) => {
  try {
    const response = await prisma.anime.findMany({
      where: {
        title: {
          contains:
            req.query.title != null
              ? String(req.query.title).toLowerCase()
              : undefined,
        },
        type: {
          contains:
            req.query.type != null
              ? String(req.query.type).toLowerCase()
              : undefined,
        },
        status: {
          contains:
            req.query.status != null
              ? String(req.query.status).toLowerCase()
              : undefined,
        },
        season: {
          contains:
            req.query.season != null
              ? String(req.query.season).toLowerCase()
              : undefined,
        },
        year: req.query.year != null ? parseInt(req.query.year) : undefined,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnime = (req, res) => {
  const { title, type, episode, status, season, year, genres } = req.body;
};

export const updateAnime = (req, res) => {};

export const deleteAnime = (req, res) => {};
