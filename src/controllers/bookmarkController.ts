import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const bookmarks = await prisma.bookmark.findMany();
  res.json({ bookmarks });
});

export default router;
