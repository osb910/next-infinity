import openai from './openai';
import {AITextOptions, AITextResponse} from './types';

export const genAIText = async ({
  messages,
  systemMsg,
  model = 'gpt-3.5-turbo',
  temperature = 0.8,
  maxTokens,
  stop,
  presencePenalty,
  frequencyPenalty,
}: AITextOptions): Promise<AITextResponse> => {
  const userMessages = messages.map(msg => ({
    role: 'user',
    content: msg,
  }));
  const chatMessages = systemMsg
    ? [{role: 'system', content: systemMsg}, ...userMessages]
    : userMessages;
  try {
    const result = await openai.chat.completions.create({
      model,
      // stream: false,
      temperature,
      // @ts-ignore
      messages: chatMessages,
      ...(maxTokens && {max_tokens: maxTokens}),
      ...(stop && {stop}),
      ...(presencePenalty && {presence_penalty: presencePenalty}),
      ...(frequencyPenalty && {frequency_penalty: frequencyPenalty}),
    });
    return {
      status: 'success',
      code: 200,
      ...result,
      messages: result.choices.map(msg => ({
        role: msg.message.role,
        content: msg.message.content,
        finishReason: msg.finish_reason,
      })),
      createdAt: new Date(result.created * 1000),
      tokens: {
        prompt: result.usage?.prompt_tokens,
        completion: result.usage?.completion_tokens,
        total: result.usage?.total_tokens,
      },
    };
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    // @ts-ignore
    if (err.cause?.code === 'ENOTFOUND') {
      return {
        status: 'error',
        message: 'Server Error',
        code: 500,
      };
    }
    const error = err as Error & {
      error: {message: string; reason: string; status: number};
    };
    return {
      status: 'error',
      message: error.error.message,
      code: error.error.status,
    };
  }
};
