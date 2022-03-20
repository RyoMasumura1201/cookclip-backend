import { PrismaClient, Video } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const videos = await prisma.video.findMany();
  res.json(videos);
});

router.post('/', async (req: Request, res: Response) => {
  const videoList: Video[] = req.body;
  console.log(videoList);

  const notExistingVideoList = videoList.filter(
    (video) => !prisma.video.findUnique({ where: { videoId: video.videoId } }),
  );

  console.log(notExistingVideoList);

  const result = await prisma.video.createMany({
    data: notExistingVideoList,
  });
  res.json(result);
});

export default router;
