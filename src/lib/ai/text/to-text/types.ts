export type AITextModel =
  | 'theb-ai'
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-16k'
  | 'gpt-4'
  | 'gpt-4-32k'
  | 'claude-2'
  | 'claude-1'
  | 'claude-1-100k'
  | 'claude-instant-1'
  | 'claude-instant-1-100k'
  | 'palm-2'
  | 'palm-2-codey'
  | 'llama-2-7b-chat'
  | 'llama-2-13b-chat'
  | 'llama-2-70b-chat'
  | 'code-llama-7b'
  | 'code-llama-13b'
  | 'code-llama-13b';

export type AIWriteOptions = {
  messages: Array<string>;
  systemMsg?: string;
  model?: AITextModel;
  temperature?: number;
  maxTokens?: number;
  stop?: Array<string>;
  presencePenalty?: number;
  frequencyPenalty?: number;
};

export type AIWriteResponse =
  | {
      status: 'success';
      code: 200;
      messages: Array<{
        role: string;
        content: string | null;
        finishReason: string;
      }>;
      createdAt: Date;
      tokens: {
        prompt?: number;
        completion?: number;
        total?: number;
      };
    }
  | {
      status: 'error';
      code: number;
      message: string;
      messages?: never;
    };

export type FineTuneAIOptions = {
  trainingFile: string;
  model: AITextModel;
};
