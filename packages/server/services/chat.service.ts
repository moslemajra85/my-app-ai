import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { conversationRespository } from '../repositories/conversation.repository';
import { history } from '../repositories/conversation.repository';
import type { GenerateContentResult } from '@google/generative-ai';
import template from '../prompts/chatbot.txt';

// implementation details
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
   async sendMessage(prompt: string): Promise<GenerateContentResult> {
      const model = genAi.getGenerativeModel({
         model: 'gemini-2.5-flash',
      });

      conversationRespository.addSystemInstructionsOnce(instructions);

      conversationRespository.addUserPromptToHistoy(prompt);

      const chat = model.startChat({
         history,
      });

      const result = await chat.sendMessage(prompt);

      const text = result.response.text();

      conversationRespository.addResponseToHistory(text);

      return result;
   },
};
