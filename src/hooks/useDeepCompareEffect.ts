'use client';

import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from 'react';
import isEqual from '@/utils/isEqual';

/**
 * Options for useDeepCompareEffect
 */
export interface DeepCompareEffectOptions {
  /** Whether to skip the initial effect call */
  skipFirst?: boolean;
  /** Custom comparison function */
  compareFunction?: <T>(a: T, b: T) => boolean;
}

// Type guard for dependency list
const isDependencyList = (value: unknown): value is DependencyList =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      item !== undefined &&
      (typeof item === 'string' ||
        typeof item === 'number' ||
        typeof item === 'boolean' ||
        typeof item === 'object' ||
        typeof item === 'function')
  );

// Optional: Add runtime validation
const validateDependencies = (dependencies: DependencyList): void => {
  if (!isDependencyList(dependencies)) {
    throw new Error(
      'Invalid dependencies array provided to useDeepCompareEffect'
    );
  }

  if (dependencies.some((dep) => dep === undefined)) {
    console.warn(
      'useDeepCompareEffect received undefined as dependency. ' +
        'This may lead to unexpected behavior.'
    );
  }
};

/**
 * Custom hook that performs a deep comparison of dependencies for useEffect
 * @template TDeps - Type of the dependencies array
 * @param callback - Effect callback function to be executed
 * @param dependencies - Array of dependencies to watch for changes
 * @param options - Optional configuration options
 */
const useDeepCompareEffect = <TDeps extends DependencyList>(
  callback: EffectCallback,
  dependencies: TDeps,
  options: DeepCompareEffectOptions = {}
): void => {
  // Validate dependencies in development
  if (process.env.NODE_ENV === 'development') {
    validateDependencies(dependencies);
  }

  const {skipFirst = false, compareFunction = isEqual} = options;
  // Use refs to store the previous dependencies and first run state
  const currentDependenciesRef = useRef<TDeps>(dependencies);
  const isFirstRun = useRef(true);

  // Perform deep comparison and update ref if dependencies changed
  if (!compareFunction(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  // Use Effect with the ref's current value as dependency
  useEffect(() => {
    // Skip first run if specified
    if (skipFirst && isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDependenciesRef.current, skipFirst]);
};

export default useDeepCompareEffect;
