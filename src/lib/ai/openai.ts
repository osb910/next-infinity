import {OpenAI} from 'openai';
import {env} from '../helpers';
import type {TrainAIOptions} from './types';

const openai = new OpenAI({
  apiKey: env('TheB_API_KEY') ?? '',
  baseURL: 'https://api.theb.ai/v1',
  // baseURL: 'https://api.baizhi.ai/v1'
});

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

export default openai;
