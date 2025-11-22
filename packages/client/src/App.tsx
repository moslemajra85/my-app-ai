import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   const fecthMessage = async () => {
      try {
         const res = await fetch('/api/hello');
         const data = await res.json();
         setMessage(data.message);
      } catch (error) {}
   };
   useEffect(() => {
      fecthMessage();
   }, []);

   return (
      <div className="p-4">
                            <p className="text-3xl">{message}</p>

            <Button>Click Me!</Button>
      </div>
   )
}

export default App;
