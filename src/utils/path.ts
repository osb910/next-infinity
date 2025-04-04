import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {env} from '@/lib/helpers';

export const root = (): string => {
  const filename = fileURLToPath(import.meta.url);
  return env('NODE_ENV') === 'development'
    ? join(dirname(filename), '..', '..')
    : process.cwd();
};

export const getPath = (pathFromRoot: string): string =>
  join(root(), pathFromRoot);

export const IS_SERVER = typeof window === 'undefined';
export const getURL = (path: string) => {
  const baseURL = (
    IS_SERVER ? process.env.ORIGIN : window.location.origin
  ) as string;
  return new URL(path, baseURL).toString();
};
