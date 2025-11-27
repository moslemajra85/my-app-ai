import axios from 'axios';
import LoadingIndicator from './LoadingIndicator';
import ChatWindow from './ChatWindow';
import { useState } from 'react';
import type { Message } from './ChatMessage';
import ChatMessage from './ChatMessage';
import type { ChatFormData } from './ChatWindow';
 


type ChatResponse = {
   message: string;
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [botTyping, setBotTyping] = useState<boolean>(false);
   const [error, setError] = useState<string>('');

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setBotTyping(true);
         setError('');
       
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
         });

         setMessages((prev) => [
            ...prev,
            {
               content: data.message,
               role: 'bot',
            },
         ]);
      } catch (error) {
         console.log(error);

         setError('Something went wrong, try agin!');
      } finally {
         setBotTyping(false);
      }
   };

 

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-3 overflow-y-auto">
            <ChatMessage messages={messages} />
            {botTyping && <LoadingIndicator />}
            {error && <p className="text-red-500">{error}</p>}
         </div>
         <ChatWindow  onSubmit={onSubmit}/>
      </div>
   );
};

export default Chatbot;
