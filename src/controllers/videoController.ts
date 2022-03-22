import { PrismaClient, Video, Prisma } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const searchText = "%" + req.query.searchText?.toString() + "%";
  const videos = await prisma.$queryRaw<Video[]>(
    Prisma.sql`SELECT * FROM "Video" WHERE title LIKE ${searchText}`,
  );
  res.json(videos);
});

export default router;
