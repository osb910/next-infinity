import {NextResponse} from 'next/server';

const env = (key: string): string => {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
};

const sendError = <T>(
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

export {env, sendError};
