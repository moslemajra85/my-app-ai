import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controllers';
import { prisma } from './prismaClient';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({
      message: 'Hello from the API!',
   });
});

router.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
   console.log('hello');
   const productId = Number(req.params.id);
   if(isNaN(productId)) return res.status(400).json({error: 'Invalid product ID'})
   const reviews = await prisma.review.findMany({
      where: {
         productId,
      },

      orderBy: {
         createdAt: 'desc',
      },
   });

   console.log(reviews);
   res.json(reviews);
});
router.post('/api/chat', chatController.sendMessage);

export default router;
