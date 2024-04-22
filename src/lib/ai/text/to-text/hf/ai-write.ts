import hf from '@/lib/ai/hf';
import type {AIWriteHFOptions, AIWriteHFResponse} from '../types';

const aiWrite = async ({
  input,
  model,
}: AIWriteHFOptions): Promise<AIWriteHFResponse> => {
  try {
    const result = await hf.textGeneration({
      inputs: input,
      model,
    });

    return {
      status: 'success',
      code: 200,
      output: result.generated_text,
      createdAt: new Date(),
    };
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    return {
      status: 'error',
      message: (err as Error).message,
      code: 500,
    };
  }
};

export default aiWrite;
