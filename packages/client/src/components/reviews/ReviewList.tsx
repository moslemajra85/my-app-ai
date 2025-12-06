import axios from 'axios';
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import { useState } from 'react';
import ReviewSkeleton from './ReviewSkeleton';

type Props = {
   productId: number;
};

type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

type SummarizeResponse = {
   summary: string;
};

const ReviewList = ({ productId }: Props) => {
   const [summary, setSummary] = useState('');
   const [loadingSummary, setLoadingSummary] = useState(false);
   const [summaryError, setSummaryError] = useState('');

   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => fetchReviews(),
   });

   const generateSummary = async () => {
      try {
         setLoadingSummary(true);
         setSummaryError('');

         const { data } = await axios.post<SummarizeResponse>(
            `/api/products/${productId}/reviews/summarize`
         );

         setSummary(data.summary);
      } catch (error) {
         console.error(error);
         setSummaryError('We could not summarize the reviews!');
      } finally {
         setLoadingSummary(false);
      }
   };

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviewsResponse>(
         `/api/products/${productId}/reviews`
      );

      return data;
   };

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

   const currentSummary = reviewData.summary || summary;
   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={generateSummary}
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
                     <p className="font-bold text-red-600">{summaryError}</p>
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
