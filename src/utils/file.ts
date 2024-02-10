import fs from 'fs/promises';
import {getPath} from './path';
import {extname} from 'path';

const readFile = async (
  pathFromRoot: string,
  encoding?: BufferEncoding,
  fallback?: string
): Promise<any> => {
  const filePath = getPath(pathFromRoot);
  const ext = extname(filePath).split('.').pop();
  try {
    const data = await fs.readFile(filePath, {encoding});
    return {data, ext};
  } catch (err) {
    if (!(err instanceof Error)) return;
    if (fallback) {
      return readFile(fallback, encoding);
    }
    console.error(err.message);
    return {data: null, ext, message: err.message, code: err.name};
  }
};

const readFolder = async (pathFromRoot: string): Promise<string[]> => {
  const path = getPath(pathFromRoot);
  try {
    const files: string[] = await fs.readdir(path);
    return files;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getFolderNames = async (pathFromRoot: string): Promise<string[]> => {
  try {
    console.log('getting folder names');
    const list = await readFolder(pathFromRoot);
    console.log({list});
    const folders = list.filter(item => !item.match(/\.[^.]+$/));
    console.log({folders});
    return folders;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const writeFile = async (
  pathFromRoot: string,
  content: any,
  {
    stringify = false,
    encoding,
    log = false,
  }: {log?: boolean; stringify?: boolean; encoding?: BufferEncoding} = {}
): Promise<void> => {
  const path = getPath(pathFromRoot);
  const body = stringify ? JSON.stringify(content, null, 2) : content;
  try {
    await fs.writeFile(path, body, {encoding});
    log && console.log(`Wrote ${body} to ${pathFromRoot}`);
  } catch (err) {
    console.error(err);
  }
};

const deleteOneObject = async (pathFromRoot: string): Promise<void> => {
  try {
    const err = (await fs.unlink(pathFromRoot)) as Error | undefined;
    if (err) {
      throw err;
    } else {
      console.log(`Deleted ${pathFromRoot}`);
    }
  } catch (err) {
    console.error(err);
  }
};

export {readFile, writeFile, deleteOneObject, readFolder, getFolderNames};
