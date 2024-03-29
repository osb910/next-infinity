import openai from './openai';

export const createImages = async () => {
  const result = await openai.images.generate({
    model: 'dall-e-2',
    prompt: 'A cute baby sea otter',
    // model_params: {
    //   n: 1,
    //   size: '1024x1024',
    // },
  });
  console.log(result.data);
};
