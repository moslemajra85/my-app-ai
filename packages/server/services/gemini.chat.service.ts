import fs from 'fs';
import path from 'path';
import { history } from '../repositories/conversation.repository';
import type { GenerateContentResult } from '@google/generative-ai';
import template from '../prompts/chatbot.txt';
import { GeminiClient} from '../llm/client';

 

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
   async sendMessage(prompt: string): Promise<GenerateContentResult> {
      return GeminiClient.generateText({
         prompt,
         instructions,
         history,
      });
   },
};
