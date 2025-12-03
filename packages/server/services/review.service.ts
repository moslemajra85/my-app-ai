import type { Review } from '@prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import { chatService } from './gemini.chat.service';
import template from '../prompts/summarize-prompt.txt';

export const reviewService = {
   getReviews: async (productId: number) => {
      return reviewRepository.getReviews(productId);
   },

   summarizeReview: async (productId: number): Promise<string> => {
      // check if there is already a summary and it is not expired
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);

      if (existingSummary) {
         return existingSummary;
      }
      // get the last 10 reviews
      const reviews = await reviewRepository.getReviews(productId, 10);

      // join the reviews to make a string to send to an LLM

      const joinedReviews = reviews
         .map((review) => review.content)
         .join('\n\n');

      // send the reviews to LLM
      const prompts = template.replace('{{reviews}}', joinedReviews);
      const result = await chatService.sendMessage(prompts);
      const summary = result.response.text();

      // store the summary in the database
      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
