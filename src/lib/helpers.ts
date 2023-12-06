import {NextResponse} from 'next/server';

const env = (key: string): string => {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
};

const getPagination = (
  currentPage?: number | string | null,
  perPage?: number | string | null
): {
  skip: number;
  limit: number;
  page: number;
} => {
  const page = Math.abs(+(currentPage ?? 1));
  const limit = Math.abs(+(perPage ?? 10));
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
    page,
  };
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

export {env, getPagination, sendError};
