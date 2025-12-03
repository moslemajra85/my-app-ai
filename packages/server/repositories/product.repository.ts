 import { prisma } from '../prismaClient';
 import type { Product } from '@prisma/client';

 export const productRepsoitory = {
   getProduct: async (productId: number): Promise<Product | null> => {
      return prisma.product.findUnique({
         where: {
            id: productId,
         }
         
      });
   },
 };
