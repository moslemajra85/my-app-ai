export type GeminiMessage = {
   role: 'user' | 'model';
   parts: { text: string }[];
};

// Implementation Details
export const history: GeminiMessage[] = [];

export const GeminiConversationRespository = {
   addSystemInstructionsOnce(instructions: string) {
      if (history.length === 0) {
         history.push({
            role: 'user', // Gemini uses only user/model roles
            parts: [{ text: instructions }],
         });
      }
   },
   addUserPromptToHistoy(prompt: string) {
      history.push({ role: 'user', parts: [{ text: prompt }] });
   },
   addResponseToHistory(response: string) {
      history.push({ role: 'model', parts: [{ text: response }] });
   },
};
