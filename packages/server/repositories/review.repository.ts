import type { Review } from '@prisma/client';
import { prisma } from '../prismaClient';

export const reviewRepository = {
   getReviews: async (productId: number): Promise<Review[]> => {
      const reviews = await prisma.review.findMany({
         where: {
            productId,
         },

         orderBy: {
            createdAt: 'desc',
         },
      });

      return reviews;
   },
};
