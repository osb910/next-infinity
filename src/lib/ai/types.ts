import type {Uploadable} from 'openai/uploads';

export type TrainAIOptions = {
  file: Uploadable;
  purpose: 'fine-tune' | 'assistants';
};
