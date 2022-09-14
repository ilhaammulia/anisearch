import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnimes = async (req, res) => {
  try {
    const response = await prisma.anime.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        episode: true,
        status: true,
        season: true,
        year: true,
        genres: true,
      },
    });
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
      select: {
        id: true,
        title: true,
        type: true,
        episode: true,
        status: true,
        season: true,
        year: true,
        genres: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnime = async (req, res) => {
  const { title, type, episode, status, season, year, genres } = req.body;
  const genreList = [];
  genres.forEach((genre) => {
    genreList.push({ name: genre });
  });
  try {
    const response = await prisma.anime.create({
      data: {
        title: String(title).toLowerCase(),
        type: String(type).toLowerCase(),
        episode: Number(episode),
        status: String(status).toLowerCase(),
        season: String(season).toLowerCase(),
        year: Number(year),
        genres: {
          create: genreList,
        },
      },
      select: {
        id: true,
        title: true,
        type: true,
        episode: true,
        status: true,
        season: true,
        year: true,
        genres: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnime = async (req, res) => {
  const { title, type, episode, status, season, year, genres } = req.body;
  const genreList = [];
  genres.forEach((genre) => {
    genreList.push({ name: genre });
  });
  try {
    const response = await prisma.anime.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        type: String(type).toLowerCase(),
        episode: episode,
        status: String(status).toLowerCase(),
        season: String(season).toLowerCase(),
        year: Number(year),
        genres: {
          deleteMany: {},
          create: genreList,
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnime = async (req, res) => {
  const animeId = Number(req.params.id);
  try {
    const deleteAnime = prisma.anime.delete({
      where: {
        id: animeId,
      },
      select: {
        id: true,
        title: true,
        type: true,
        episode: true,
        status: true,
        season: true,
        year: true,
        genres: true,
      },
    });
    const deleteGenres = prisma.genre.deleteMany({
      where: {
        id_anime: animeId,
      },
    });
    const response = await prisma.$transaction([deleteAnime, deleteGenres]);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
