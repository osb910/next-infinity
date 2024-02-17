import fs from 'fs/promises';
import {getPath} from './path';
import {extname, join} from 'path';
import {ObjectEncodingOptions, PathLike} from 'fs';

const readFile = async (
  pathFromRoot: string,
  {encoding, fallback}: {encoding?: BufferEncoding; fallback?: string} = {}
): Promise<any> => {
  const filePath = getPath(pathFromRoot);
  const ext = extname(filePath).split('.').pop();
  try {
    const data = await fs.readFile(filePath, {encoding});
    return {data, ext};
  } catch (err) {
    if (!(err instanceof Error)) return;
    if (fallback) {
      return await readFile(fallback, {encoding});
    }
    console.error(err.message);
    return {data: null, ext, message: err.message, code: err.name};
  }
};

const readFolder = async (
  path: string,
  options?:
    | (ObjectEncodingOptions & {
        withFileTypes?: false | undefined;
        recursive?: boolean | undefined;
      })
    | BufferEncoding
    | null
): Promise<string[]> => {
  try {
    const files: string[] = await fs.readdir(
      join(process.cwd(), path),
      options
    );
    return files;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getFolderNames = async (path: string): Promise<string[]> => {
  try {
    const list = await readFolder(path);
    const folders = list.filter(item => !item.match(/\.[^.]+$/));
    return folders;
  } catch (err) {
    console.error(err);
    return [];
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

const deleteFile = async (pathFromRoot: string): Promise<void> => {
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

export const calculateDirSize = async (dir: string): Promise<number> => {
  const files = await fs.readdir(dir, {withFileTypes: true});

  const sizesPromises = files.map(async file => {
    const path = join(file.path, file.name);

    if (file.isDirectory()) return await calculateDirSize(path);

    if (file.isFile()) {
      const {size} = await fs.stat(path);

      return size;
    }

    return 0;
  });

  const sizes = await Promise.all(sizesPromises);

  return sizes.flat(Infinity).reduce((acc, size) => acc + size, 0);
};

export {readFile, writeFile, deleteFile, readFolder, getFolderNames};
