import type {Uploadable} from 'openai/uploads';

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
  | '	llama-2-7b-chat'
  | 'llama-2-13b-chat'
  | 'llama-2-70b-chat'
  | 'code-llama-7b'
  | 'code-llama-13b'
  | 'code-llama-13b';

export type AIImageModel = 'dall-e-2' | 'dall-e-3';

export type AITextOptions = {
  messages: Array<string>;
  systemMsg?: string;
  model?: AITextModel;
  temperature?: number;
  maxTokens?: number;
  stop?: Array<string>;
  presencePenalty?: number;
  frequencyPenalty?: number;
};

export type AITextResponse =
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

export type GenerateImageOptions = {
  prompt: string;
  num?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
} & (
  | {
      model?: 'dall-e-2';
      size?: '256x256' | '512x512' | '1024x1024';
      style?: never;
    }
  | {
      model?: 'dall-e-3';
      size?: '1024x1024' | '1792x1024' | '1024x1792';
      style?: 'vivid' | 'natural';
    }
);

export type TrainAIOptions = {
  file: Uploadable;
  purpose: 'fine-tune' | 'assistants';
};

export type FineTuneAIOptions = {
  trainingFile: string;
  model: AITextModel;
};
