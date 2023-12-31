import fs from 'fs/promises';
import {getPath} from './path';

const readFile = async (pathFromRoot: string): Promise<any> => {
  const filePath = getPath(pathFromRoot);
  const ext = pathFromRoot.split('.').pop();
  const data: string = await fs.readFile(filePath, 'utf8');
  try {
    return ext ? JSON.parse(data) : data;
  } catch (err) {
    console.error(err);
    return data;
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
    const list = await readFolder(pathFromRoot);
    const folders = list.filter(item => !item.match(/\.[^.]+$/));
    return folders;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const writeFile = async (
  pathFromRoot: string,
  content: any,
  {log = false, stringify = false}: {log?: boolean; stringify?: boolean} = {}
): Promise<void> => {
  const path = getPath(pathFromRoot);
  const body =
    typeof content === 'string' || !stringify
      ? content
      : JSON.stringify(content, null, 2);
  try {
    await fs.writeFile(path, body, {
      encoding: 'utf8',
    });
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
