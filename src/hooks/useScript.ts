'use client';

import {useEffect} from 'react';
import useAsync, {type UseAsyncOptions} from './useAsync';

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ScriptAttributes {
  async?: boolean;
  defer?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials';
  integrity?: string;
  noModule?: boolean;
  nonce?: string;
  referrerPolicy?: ReferrerPolicy;
  type?: string;
  id?: string;
}

export interface UseScriptOptions extends Omit<UseAsyncOptions, 'immediate'> {
  attributes?: ScriptAttributes;
  removeOnUnmount?: boolean;
}

export class ScriptError extends Error {
  constructor(public url: string, public evt: Event) {
    super(`Failed to load script: ${url}`);
    this.name = 'ScriptError';
  }
}

const SCRIPT_CACHE: Map<string, HTMLScriptElement> = new Map();

const useScript = (url: string | null, options: UseScriptOptions = {}) => {
  const {
    attributes = {async: true},
    removeOnUnmount = false,
    ...asyncOptions
  } = options;

  const loadScript = async (scriptUrl: string): Promise<HTMLScriptElement> => {
    // Check if script is already in cache
    const cachedScript = SCRIPT_CACHE.get(scriptUrl);
    if (cachedScript) {
      return Promise.resolve(cachedScript);
    }

    // Create new script element
    const script = document.createElement('script');
    script.src = scriptUrl;

    // Apply attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined) {
        // Handle boolean attributes
        if (typeof value === 'boolean') {
          if (value) {
            script.setAttribute(key, '');
          }
        } else {
          script.setAttribute(key, value.toString());
        }
      }
    });

    // Create load promise
    const loadPromise = new Promise<HTMLScriptElement>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const handleLoad = (evt: Event) => {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);
        resolve(script);
      };

      const handleError = (evt: Event) => {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);
        reject(new ScriptError(scriptUrl, evt));
      };

      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError);
    });

    // Append script to document
    document.body.appendChild(script);

    // Add to cache
    SCRIPT_CACHE.set(scriptUrl, script);

    return loadPromise;
  };

  const result = useAsync<HTMLScriptElement>(
    async () => {
      if (!url) {
        throw new Error('URL is required');
      }
      return loadScript(url);
    },
    [url],
    {
      ...asyncOptions,
      onError: (error) => {
        asyncOptions.onError?.(error);
        // Remove failed script from cache
        if (url) {
          SCRIPT_CACHE.delete(url);
        }
      },
    }
  );

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (url && removeOnUnmount) {
        const script = SCRIPT_CACHE.get(url);
        if (script) {
          document.body.removeChild(script);
          SCRIPT_CACHE.delete(url);
        }
      }
    };
  }, [url, removeOnUnmount]);

  return {
    ...result,
    status: result.status as ScriptStatus,
    script: result.data,
  };
};

export default useScript;
