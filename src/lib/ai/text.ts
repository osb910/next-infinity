import openai from './openai';

export type AIModel =
  | 'theb-ai'
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-16k'
  | 'gpt-4'
  | 'gpt-4-32k'
  | 'claude-2'
  | 'claude-1'
  | 'claude-1-100k'
  | 'claude-instant-1'
  | 'claude-instant-1-100k'
  | 'palm-2'
  | 'palm-2-codey'
  | '	llama-2-7b-chat'
  | 'llama-2-13b-chat'
  | 'llama-2-70b-chat'
  | 'code-llama-7b'
  | 'code-llama-13b'
  | 'code-llama-13b';

export type AIChatOptions = {
  messages: Array<string>;
  systemMsg?: string;
  model?: AIModel;
  temperature?: number;
};

export const genAIText = async ({
  messages,
  systemMsg,
  model = 'gpt-3.5-turbo',
  temperature = 0.8,
}: AIChatOptions) => {
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
    if (!(err instanceof Error)) return;
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
