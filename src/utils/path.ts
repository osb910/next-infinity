import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const rootPath = (): string => {
  const __filename = fileURLToPath(import.meta.url);
  return join(dirname(__filename), '..');
};

const getPath = (pathFromRoot: string): string =>
  join(rootPath(), pathFromRoot);

const IS_SERVER = typeof window === 'undefined';
const getURL = (path: string) => {
  const baseURL = IS_SERVER ? process.env.ORIGIN! : window.location.origin;
  return new URL(path, baseURL).toString();
};

export {rootPath, getPath, getURL, IS_SERVER};
