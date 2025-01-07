'use client';

import {useCallback, useEffect, useState, type DependencyList} from 'react';

export type AsyncState<T> = {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
};

export type UseAsyncOptions = {
  immediate?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};

const useAsync = <T>(
  callback: () => Promise<T>,
  dependencies: DependencyList = [],
  options: UseAsyncOptions = {}
) => {
  const {immediate = true, onSuccess, onError, onSettled} = options;
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({...prev, status: 'pending'}));

    try {
      const response = await callback();
      setState({
        status: 'success',
        data: response,
        error: null,
      });
      onSuccess?.(response);
      return response;
    } catch (error) {
      const errorObject =
        error instanceof Error ? error : new Error(String(error));
      setState({
        status: 'error',
        data: null,
        error: errorObject,
      });
      onError?.(errorObject);
      return Promise.reject(errorObject);
    } finally {
      onSettled?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    isIdle: state.status === 'idle',
    isPending: state.status === 'pending',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
};

export default useAsync;
