import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

interface Props {
   messages: Message[];
}

const ChatMessage = ({ messages }: Props) => {
   const messageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      messageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   // copy text without extra noise(spaces, ...etc)
   const onCopyText = (e: React.ClipboardEvent<HTMLParagraphElement>): void => {
      // get the selected text
      const selectedText = window.getSelection()?.toString().trim();

      if (selectedText) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selectedText);
      }
   };


   return (
      <div className='flex flex-col gap-3'>
         {messages.map((message: Message, idx: number) => (
            <div
               onCopy={onCopyText}
               ref={idx === messages.length - 1 ? messageRef : null}
               className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-black text-white self-end' : 'bg-gray-100 text-black self-start'}`}
               key={idx}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessage;
