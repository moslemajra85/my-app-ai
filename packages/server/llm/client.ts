import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiConversationRespository } from '../repositories/conversation.repository';
import type { GeminiMessage } from '../repositories/conversation.repository';

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

type GenerateTextOptions = {
   prompt: string;
   instructions: string;
   history: GeminiMessage[];
};

export const GeminiClient = {
   generateText: async ({
      prompt,
      instructions,
      history,
   }: GenerateTextOptions) => {
      const model = genAi.getGenerativeModel({
         model: 'gemini-2.5-flash',
      });

      GeminiConversationRespository.addSystemInstructionsOnce(instructions);

      GeminiConversationRespository.addUserPromptToHistoy(prompt);

      const chat = model.startChat({
         history,
      });

      const result = await chat.sendMessage(prompt);

      const text = result.response.text();

      GeminiConversationRespository.addResponseToHistory(text);

      return result;
   },
};
