export type GeminiMessage = {
   role: 'user' | 'model';
   parts: { text: string }[];
};

// Implementation Details
export const history: GeminiMessage[] = [];

export const conversationRespository = {
   addUserPromptToHistoy(prompt: string) {
      history.push({ role: 'user', parts: [{ text: prompt }] });
   },
   addResponseToHistory(response: string) {
      history.push({ role: 'model', parts: [{ text: response }] });
   },
};
