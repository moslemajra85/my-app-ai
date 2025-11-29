import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};
const ChatWindow = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const submit = handleSubmit((data) => {
      reset({
         prompt: '',
      });

      onSubmit(data);
   });

   const onkeydown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         //handleSubmit(onSubmit)();
         submit();
      }
   };
   return (
      <form
         onSubmit={submit}
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
            autoFocus
            placeholder="Ask anything"
            maxLength={1000}
            className="w-full border-0  focus:outline-0 resize-none"
         ></textarea>
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp className="text-xl" />
         </Button>
      </form>
   );
};

export default ChatWindow;
