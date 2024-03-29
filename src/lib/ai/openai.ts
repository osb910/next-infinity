import {OpenAI} from 'openai';
import {env} from '../helpers';

const openai = new OpenAI({
  apiKey: env('TheB_API_KEY') ?? '',
  baseURL: 'https://api.theb.ai/v1',
  // baseURL: 'https://api.baizhi.ai/v1'
});

export default openai;
