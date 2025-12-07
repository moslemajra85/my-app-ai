import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiConversationRespository } from '../repositories/conversation.repository';
import type { GeminiMessage } from '../repositories/conversation.repository';
import { InferenceClient } from '@huggingface/inference';
import summaryPrompt from '../prompts/summary-prompt.txt';
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

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

export const HFInference = {
   // summarize: async (text: string) => {
   //    const output = await inferenceClient.summarization({
   //       model: 'facebook/bart-large-cnn',
   //       inputs: text,
   //       provider: 'hf-inference',
   //    });

   //    return output.summary_text
   // },

   summarizeReviews: async (reviews: string) => {
      const chatCompletion = await inferenceClient.chatCompletion({
         model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
         messages: [
            { role: 'system', content: summaryPrompt },
            {
               role: 'user',
               content: reviews,
            },
         ],
      });

      return chatCompletion.choices[0]?.message.content || '';
   },
};
