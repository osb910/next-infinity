'use client';

import useAsync, {type UseAsyncOptions} from './useAsync';
import {type DependencyList} from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit | null;
  credentials?: RequestCredentials;
}

export interface UseFetchOptions<T> extends UseAsyncOptions {
  fetchOptions?: FetchOptions;
  transform?: (data: unknown) => T;
  validateStatus?: (status: number) => boolean;
}

const DEFAULT_OPTIONS: FetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

const DEFAULT_VALIDATE_STATUS = (status: number) =>
  status >= 200 && status < 300;

export class FetchError extends Error {
  constructor(
    public response: Response,
    public data: unknown,
    message?: string
  ) {
    super(message || `HTTP Error ${response.status}: ${response.statusText}`);
    this.name = 'FetchError';
  }
}

const useFetch = <T = unknown>(
  url: string,
  options: UseFetchOptions<T> = {},
  dependencies: DependencyList = []
) => {
  const {
    fetchOptions = {},
    transform,
    validateStatus = DEFAULT_VALIDATE_STATUS,
    ...asyncOptions
  } = options;

  const mergedFetchOptions = {
    ...DEFAULT_OPTIONS,
    ...fetchOptions,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...fetchOptions.headers,
    },
  };

  return useAsync<T>(
    async () => {
      try {
        const response = await fetch(url, mergedFetchOptions);
        const data = await response.json();

        if (!validateStatus(response.status)) {
          throw new FetchError(response, data);
        }

        return transform?.(data) ?? data;
      } catch (error) {
        if (error instanceof FetchError) {
          throw error;
        }

        // Handle network errors or other exceptions
        throw new Error(
          error instanceof Error
            ? error.message
            : 'An error occurred during fetch'
        );
      }
    },
    dependencies,
    asyncOptions
  );
};

export default useFetch;
