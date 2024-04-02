import openai from './openai';
import type {FineTuneAIOptions, TrainAIOptions} from './types';

export const trainAI = async ({file, purpose}: TrainAIOptions) => {
  try {
    const result = await openai.files.create({
      file,
      purpose,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

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
