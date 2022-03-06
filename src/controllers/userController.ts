import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name, email },
  });
  res.json({ user });
});

export default router;
