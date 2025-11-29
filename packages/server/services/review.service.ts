import { reviewRepository } from '../repositories/review.repository';
export const reviewService = {
   getReviews: async (productId: number) => {
      return reviewRepository.getReviews(productId);
   },
};
