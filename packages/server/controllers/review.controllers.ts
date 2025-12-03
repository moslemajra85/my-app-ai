import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepsoitory } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   getReviews: async (req: Request, res: Response) => {
      const productId = Number(req.params.id);
      if (isNaN(productId))
         return res.status(400).json({ error: 'Invalid product ID' });

      const product = await productRepsoitory.getProduct(productId);

      if (!product) return res.status(404).json({ error: 'Product not found' });

      const reviews = await reviewService.getReviews(productId);

      const summary = await reviewRepository.getReviewSummary(productId);

      if (!reviews.length)
         return res.status(400).json({ error: 'No reviews found' });

      res.json({
         summary,
         reviews,
      });
   },

   summarizeReviews: async (req: Request, res: Response) => {
      const productId = Number(req.params.id);
      if (isNaN(productId))
         return res.status(400).json({ error: 'Invalid product ID' });

      const summary = await reviewService.summarizeReview(productId);

      res.json({ summary });
   },
};
