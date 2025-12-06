import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import type { GetReviewsResponse, SummarizeResponse } from './reviewsApi';
import { reviewsApi } from './reviewsApi';

type Props = {
   productId: number;
};

const ReviewList = ({ productId }: Props) => {
   const {
      mutate: handleSummarize,
      isPending: loadingSummary,
      isError: summaryError,
      data: summarizeResponse,
   } = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
   });

   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
   });

   if (isLoading)
      return (
         <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
               <ReviewSkeleton key={item} />
            ))}
         </div>
      );

   if (error) {
      return (
         <p className="text-red-500 font-bold">
            We Could not Fetch Reviews .Try again
         </p>
      );
   }

   if (!reviewData?.reviews.length) {
      return null;
   }

   const currentSummary = reviewData.summary || summarizeResponse?.summary;
   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={() => handleSummarize()}
                     className="cursor-pointer"
                     disabled={loadingSummary}
                  >
                     <HiSparkles color="gold" /> Summarize
                  </Button>

                  {loadingSummary && (
                     <div className="py-3">
                        {' '}
                        <ReviewSkeleton />
                     </div>
                  )}

                  {summaryError && (
                     <p className="font-bold text-red-600">
                        We Could not summarize reviews.Try again
                     </p>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {reviewData?.reviews.map((review) => {
               return (
                  <div key={review.id}>
                     <div className="font-bold">{review.author}</div>
                     <p className="py-2">{review.content}</p>
                     <div>
                        <StarRating value={review.rating} />
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default ReviewList;
