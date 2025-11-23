import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [botTyping, setBotTyping] = useState<boolean>(false);

   const formRef = useRef<HTMLFormElement | null>(null);

   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

      setBotTyping(true);
      reset();
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

      setBotTyping(false);
   };

   const onkeydown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   useEffect(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);
   return (
      <div>
         <div className="flex flex-col gap-3 mb-3">
            {messages.map((message: Message, idx: number) => (
               <p
                  className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-black text-white self-end' : 'bg-gray-100 text-black self-start'}`}
                  key={idx}
               >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
               </p>
            ))}

            {botTyping && (
               <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse">
                     .
                  </div>{' '}
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay: 0.2s]">
                     .
                  </div>{' '}
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay: 0.4s]">
                     .
                  </div>
               </div>
            )}
         </div>
         <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onkeydown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (value: string) => {
                     return value.trim().length > 0;
                  },
               })}
               placeholder="Ask anything"
               maxLength={1000}
               className="w-full border-0  focus:outline-0 resize-none"
            ></textarea>
            <Button
               disabled={!formState.isValid}
               className="rounded-full w-9 h-9"
            >
               <FaArrowUp className="text-xl" />
            </Button>
         </form>
      </div>
   );
};

export default Chatbot;
