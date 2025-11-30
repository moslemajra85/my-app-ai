import type { Request, Response } from 'express';
import { chatService } from '../services/gemini.chat.service';
import z, { string } from 'zod';

// implementation details
const MessageSchema = z.object({
   prompt: string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, "Prompt can't be longer than 1000 characters"),
});

//public interface
export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      const parseResult = MessageSchema.safeParse(req.body);

      if (!parseResult.success) {
         res.status(400).json({ message: parseResult.error.format() });
         return;
      }

      try {
         const { prompt } = req.body;

         const result = await chatService.sendMessage(prompt);
         res.json({ message: result.response.text() });
      } catch (error) {
         res.status(500).json({
            error: 'Failed to generetae a response.',
         });
      }
   },
};
