import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {execSync, spawn, type ChildProcess} from 'child_process';
import type {RunRegex, RunRegexOptions, RunRegexResponse} from './types';
import { getPath } from '@/utils/path';

const filename = fileURLToPath(import.meta.url);
const pypiRegexPath = join(dirname(filename), 'pypi-regex.py');

export const installDeps = () => {
  return execSync(`sudo apt install -y build-essential libssl-dev zlib1g-dev libncurses5-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncursesw5-dev xz-utils tk-dev \
libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev`).toString()
}

export const updateApt = () => {
  if (process.platform !== 'linux') return;
  const upgrade = execSync(`sudo apt update && sudo apt upgrade -y`).toString();
  const checkPython = execSync(`apt list | grep python3.12`).toString();
  return { upgrade, checkPython };
}

export const checkPython = () => {
  const pyVer = execSync(`python3 --version`).toString();
  return pyVer;
}

export const getPythonPath = () => {
  const pyVer = execSync(`which python3`).toString();
  return pyVer;
}

export const installPython3 = () => {
  if (process.platform !== 'linux') return;
  const installed = execSync(`sudo apt install python3`).toString();
  // const alt = execSync(`sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12`)
  return { installed};
}

const pyRegex = async ({
  method,
  text,
  pattern,
  flags = [],
  repl,
}: RunRegexOptions) => {
  const args = [method, pattern, text];
  repl && args.push('--r', repl);
  flags && args.push('--flags', flags.join(''));
  try {
    const pyRegex: ChildProcess = spawn('python', [pypiRegexPath, ...args]);
    const promise = new Promise((resolve, reject) => {
      pyRegex.stdout?.on('data', (data) => {
        const res = JSON.parse(data.toString().trim());
        if (res.errors) {
          reject(res);
        }
        resolve(res);
      });
      pyRegex.stderr?.on('data', (data) => {
        reject(data.toString());
      });
      pyRegex.on('close', (code) =>
        console.log(`Process exited with code ${code}`)
      );
    }).catch((err) => {
      console.error('Error in Python script execution:', err);
      return err;
    });
    return promise as Promise<RunRegexResponse>;
  } catch (err) {
    console.log('catch pyregex', err);
  }
};

export default pyRegex;
