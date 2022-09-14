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

export const createAnime = async (req, res) => {
  const { title, type, episode, status, season, year, genres } = req.body;
  try {
    const response = await prisma.anime.create({
      title: title,
      type: String(type).toLowerCase(),
      episode: episode,
      status: String(status).toLowerCase(),
      season: String(season).toLowerCase(),
      year: Number(year),
      genres: {
        create: genres.forEach((genre) => {
          {
            name: genre;
          }
        }),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnime = (req, res) => {};

export const deleteAnime = (req, res) => {};
