import openai from '@/lib/ai/openai';
import {AIDrawOptions} from '../types';

const aiDraw = async ({
  prompt,
  model = 'dall-e-2',
  num = 1,
  size = '512x512',
  style = 'vivid',
}: AIDrawOptions) => {
  try {
    const result = await openai.images.generate({
      prompt,
      model,
      n: num,
      size,
      ...(model === 'dall-e-3' && {style}),
      response_format: 'b64_json',
    });
    return {
      status: 'success',
      message: `${num === 1 ? 'Image' : 'Images'} generated successfully.`,
      data: result.data.map(image => ({
        revisedPrompt: image.revised_prompt,
        img: `data:image/png;base64,${image.b64_json}`,
      })),
      createdAt: new Date(result.created * 1000),
      created: result.created,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      message: (err as Error).message,
      data: null,
    };
  }
};

export default aiDraw;
