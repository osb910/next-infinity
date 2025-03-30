import type {GetP8n, ResponseStatus} from '@/types';
import {NextResponse} from 'next/server';

export const env = (key: string): string | null => {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
  }

  return value || null;
};

export const getP8n: GetP8n = (count, currentPage, perPage) => {
  const limit = Math.abs(+(perPage ?? env('DEFAULT_PAGE_LIMIT') ?? 10)) || 10;
  const pages = Math.ceil(count / limit);
  let page = Math.abs(+(currentPage ?? 1)) || 1;
  if (page > pages) page = pages;
  const skip = (page - 1) * limit;
  const previous = page - 1 || null;
  const next = page < pages ? page + 1 : null;

  return {
    count,
    skip,
    limit,
    pages,
    page,
    previous,
    next,
  };
};

export const sendError = <T>(
  status: string = 'error',
  code: number = 500,
  message: string,
  error: T | null = null
) => {
  return new NextResponse(
    JSON.stringify({
      status,
      message,
      error,
    }),
    {
      status: code,
      headers: {'Content-Type': 'application/json'},
    }
  );
};

export const jsonifyError = ({
  err,
  status = 'error',
  message,
  code = 500,
  errorMap,
}: {
  err?: any;
  message?: string;
  code?: number;
  status?: ResponseStatus;
  errorMap?: {count: number} & Record<string, unknown>;
} = {}) => {
  if (err?.code === 11000) {
    code = 409;
    message = `${Object.keys(err.keyPattern)[0]} ${
      err.keyValue[Object.keys(err.keyPattern)[0]]
    } already exists.`;
  }
  let error = err;
  if (!error && message) {
    error = new Error(message);
  }
  const callerMatch = error.stack?.split('\n')[2].match(/\s*at (\w+)/);
  const caller = callerMatch?.[1];
  console.log(`[${caller}]:`, error);

  if (errorMap) {
    console.log(`[${caller}]:`, JSON.stringify(errorMap, null, 2));
  }

  const json = {
    status,
    message: error.message,
    code,
    ...(errorMap ?? {errors: errorMap}),
  };

  return json;
};
