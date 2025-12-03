import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';

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

const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponse>();
   const [isLoading, setIsLoading] = useState(false);

   const fetchReviews = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.get<GetReviewsResponse>(
            `/api/products/${productId}/reviews`
         );

         setReviewData(data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, []);

   if (isLoading)
      return (
         <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
               <div key={item}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   return (
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
   );
};

export default ReviewList;
