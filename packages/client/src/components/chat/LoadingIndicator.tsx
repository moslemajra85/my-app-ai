const LoadingIndicator = () => {
   return (
      <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
         <Dot />
         <Dot animationDelay="0.4" />
         <Dot animationDelay="0.6" />
      </div>
   );
};

interface DotProps {
   animationDelay?: string;
}

const Dot = ({ animationDelay = '0' }: DotProps) => {
   return (
      <div
         className={`w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay: ${animationDelay}s ]`}
      >
         {' '}
         .
      </div>
   );
};

export default LoadingIndicator;
