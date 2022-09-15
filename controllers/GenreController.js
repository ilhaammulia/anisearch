import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGenres = async (req, res) => {
  try {
    const response = await prisma.genre.groupBy({
      by: ["name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGenreByFilter = async (req, res) => {
  try {
    const response = await prisma.genre.findMany({
      where: {
        name:
          req.query.name != null
            ? String(req.query.name).toLowerCase()
            : undefined,
      },
      select: {
        id: true,
        name: true,
        anime: {
          select: {
            id: true,
            title: true,
            type: true,
            episode: true,
            status: true,
            season: true,
            year: true,
          },
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
