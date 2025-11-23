import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import z, { string } from 'zod';
import { chatService } from './services/chat.service';
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({
      message: 'Hello from the API!',
   });
});

const MessageSchema = z.object({
   prompt: string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, "Prompt can't be longer than 1000 characters"),
});

app.post('/api/chat', async (req: Request, res: Response) => {
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
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

export default app;
