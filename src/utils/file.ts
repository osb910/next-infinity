import fs from 'fs/promises';
import {getPath} from './path';
import {extname, join} from 'path';

export const readFile = async (
  pathFromRoot: string,
  {encoding, fallback}: {encoding?: BufferEncoding; fallback?: string} = {}
): Promise<any> => {
  const filePath = join(process.cwd(), pathFromRoot);
  const ext = extname(filePath).split('.').pop();
  try {
    const data = await fs.readFile(filePath, {encoding});
    return {data, ext, message: 'File read successfully', code: 200};
  } catch (err) {
    if (!(err instanceof Error)) return;
    if (fallback) {
      return await readFile(fallback, {encoding});
    }
    console.error(err.message);
    return {data: null, ext, message: err.message, name: err.name, code: 404};
  }
};

export const readDir = async (
  path: string
): Promise<
  Array<{
    name: string;
    dir: string;
    path: string;
  }>
> => {
  try {
    const files = await fs.readdir(join(process.cwd(), path), {
      withFileTypes: true,
    });
    return files.map(({path, name}) => ({
      name,
      dir: path,
      path: join(path, name),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getDirNames = async (
  path: string
): Promise<
  Array<{
    name: string;
    dir: string;
    path: string;
  }>
> => {
  try {
    const list = await fs.readdir(join(process.cwd(), path), {
      withFileTypes: true,
    });
    const folders = list
      .filter(item => item.isDirectory())
      .map(({path, name}) => ({
        name,
        dir: path,
        path: join(path, name),
      }));
    return folders;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const writeFile = async (
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
    log && console.log(`Wrote file to ${pathFromRoot}`);
  } catch (err) {
    console.error(err);
  }
};

export const deleteFile = async (pathFromRoot: string): Promise<void> => {
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
