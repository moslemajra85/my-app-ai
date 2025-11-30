import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controllers';
import { reviewController } from './controllers/review.controllers';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({
      message: 'Hello from the API!',
   });
});

router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post('/api/products/:id/reviews/summarize', reviewController.summarizeReviews);
router.post('/api/chat', chatController.sendMessage);

export default router;
