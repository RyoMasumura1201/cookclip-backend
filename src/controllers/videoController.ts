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

router.get("/:videoId", async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const video = await prisma.video.findUnique({ where: { videoId } });
  res.json(video);
});
export default router;
