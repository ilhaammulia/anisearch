import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGenres = async (req, res) => {
  try {
    const response = await prisma.genre.findUnique();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
