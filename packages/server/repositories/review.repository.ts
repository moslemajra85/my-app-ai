import type { Review } from '@prisma/client';
import { prisma } from '../prismaClient';
import dayjs from 'dayjs';

export const reviewRepository = {
   getReviews: async (productId: number, limit?: number): Promise<Review[]> => {
      const reviews = await prisma.review.findMany({
         where: {
            productId,
         },

         orderBy: {
            createdAt: 'desc',
         },

         take: limit,
      });

      return reviews;
   },

   storeReviewSummary: async (productId: number, summary: string) => {
      const now = new Date();
      const expiredAt = dayjs().add(7, 'days').toDate();

      const data = {
         productId,
         content: summary,
         generatedAt: now,
         expiredAt,
      };

      return prisma.summary.upsert({
         where: {
            productId,
         },

         create: data,
         update: data,
      });
   },

   getReviewSummary: async (productId: number): Promise<string | null> => {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [
               {
                  productId,
               },
               {
                  expiredAt: {
                     gte: new Date(),
                  },
               },
            ],
         },
      });

      return summary?.content || null;
   },
};
