export type AIImageModel = 'dall-e-2' | 'dall-e-3';

export type AIDrawOptions = {
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
