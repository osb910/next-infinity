import fs from 'fs/promises';
import {getPath} from './path';
import {extname, join} from 'path';

export interface DirInfo {
  name: string;
  dir: string;
  path: string;
  size?: number;
}

export interface DirInfoWithSize extends DirInfo {
  size: number;
}

export const readFile = async (
  pathFromRoot: string,
  {encoding, fallback}: {encoding?: BufferEncoding; fallback?: string} = {}
): Promise<{
  data: Buffer | string | null;
  ext: string | undefined;
  message: string;
  code: number;
  name?: string;
}> => {
  const filePath = getPath(pathFromRoot);
  const ext = extname(filePath).split('.').pop();
  try {
    const data = await fs.readFile(filePath, {encoding});
    return {data, ext, message: 'File read successfully', code: 200};
  } catch (err) {
    if (!(err instanceof Error)) {
      throw new Error(`Unknown error on reading ${filePath}`);
    }

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

export const writeFile = async (
  pathFromRoot: string,
  content: string | NodeJS.ArrayBufferView,
  {
    stringify = false,
    encoding,
    log = false,
  }: {log?: boolean; stringify?: boolean; encoding?: BufferEncoding} = {}
): Promise<{success: boolean; error?: string}> => {
  const path = getPath(pathFromRoot);
  const body =
    stringify && typeof content === 'object'
      ? JSON.stringify(content, null, 2)
      : content;
  try {
    await fs.writeFile(path, body, {encoding});
    if (log) {
      console.log(`Wrote file to ${pathFromRoot}`);
    }
    return {success: true};
  } catch (err) {
    const message =
      err instanceof Error ? err.message : `Unknown error writing ${path}`;
    console.error(err);
    return {success: false, error: message};
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

  const sizesPromises = files.map(async (file) => {
    const path = join(
      process.env.NODE_ENV === 'development' ? file.path : file.parentPath,
      file.name
    );

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

export type GetDirInfoOptions = {
  filter?: Array<string>;
  getSize?: boolean;
  sortAsc?: boolean;
  sortDesc?: boolean;
};

export const getDirInfo = async (
  path: string,
  {filter, getSize, sortAsc, sortDesc}: GetDirInfoOptions = {}
): Promise<Array<DirInfo | DirInfoWithSize>> => {
  try {
    const list = await fs.readdir(join(process.cwd(), path), {
      withFileTypes: true,
    });

    let folders = list
      .filter((item) => item.isDirectory())
      .map(({path, parentPath, name}) => ({
        name,
        dir: process.env.NODE_ENV === 'development' ? path : parentPath,
        path: join(
          process.env.NODE_ENV === 'development' ? path : parentPath,
          name
        ),
      }));

    if (filter && filter.length > 0) {
      folders = folders.filter(({name}) => !filter.includes(name));
      if (folders.length === 0) return [];
    }

    if (getSize) {
      const foldersWithSize = (await Promise.all(
        folders.map(async (folder) => ({
          ...folder,
          size: await calculateDirSize(folder.path),
        }))
      )) as Array<DirInfoWithSize>;

      if (sortAsc) {
        foldersWithSize.sort((a, b) => a.size! - b.size!);
      } else if (sortDesc) {
        foldersWithSize.sort((a, b) => b.size! - a.size!);
      }

      folders = foldersWithSize;
    }

    return folders;
  } catch (err) {
    console.error(err);
    return [];
  }
};
