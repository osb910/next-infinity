import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {spawn, type ChildProcess} from 'child_process';
import type {RunRegex, RunRegexOptions, RunRegexResponse} from './types';

const filename = fileURLToPath(import.meta.url);
const pypiRegexPath = join(dirname(filename), 'pypi-regex.py');

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
    const pyRegex: ChildProcess = spawn('python3', [pypiRegexPath, ...args]);
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
