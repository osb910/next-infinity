import openai from '@/lib/ai/openai';
import type {FineTuneAIOptions} from '../types';

export const fineTuneAI = async ({
  trainingFile,
  model = 'gpt-3.5-turbo',
}: FineTuneAIOptions) => {
  try {
    const result = await openai.fineTuning.jobs.create({
      training_file: trainingFile,
      model,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
