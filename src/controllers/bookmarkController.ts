import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const bookmarks = await prisma.bookmark.findMany();
  res.json(bookmarks);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, startAt, videoId, email } = req.body;
  console.log(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const bookmark = await prisma.bookmark.create({
      data: {
        title: title,
        startAt: startAt,
        videoId: videoId,
        userId: user.id,
      },
    });
    res.json(bookmark);
  }
});

export default router;
