import { FaStar } from 'react-icons/fa';
// import { FaRegStar } from 'react-icons/fa';

type Props = {
   value: number;
};

const StarRating = ({value}: Props) => {
   const placeHolders = [1, 2, 3, 4, 5];
   return (
      <div className="flex">
         {placeHolders.map((placeholder) => (
            placeholder <= value ? (
               <FaStar key={placeholder} className="text-yellow-500" />
            ) : (
               <FaStar key={placeholder} className="text-gray-300" />
            )
         ))}
      </div>
   );
};

export default StarRating;
