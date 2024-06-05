import {spawn, ChildProcess} from 'child_process';
import {getPath} from '@/utils/path';
import type {RunRegexOptions} from './types';

const regexPath = getPath('src/lib/text/regex/py-regex/regex.py');

export const runRegex = ({
  method,
  str,
  pattern,
  flags = '',
}: RunRegexOptions) => {
  const args = [method, str, pattern];
  flags && args.push('--flags', flags);
  try {
    const pyRegex: ChildProcess = spawn('python', [regexPath, ...args]);
    return new Promise((resolve, reject) => {
      pyRegex.stdout?.on('data', (data) => {
        resolve(data.toString().trim());
      });
      pyRegex.stderr?.on('data', (data) => {
        reject(data.toString());
      });
      pyRegex.on('close', (code) =>
        console.log(`Process exited with code ${code}`)
      );
    }).catch((err) => {
      console.error('Error occurred during Python script execution:', err);
    });
  } catch (err) {
    console.log(err);
  }
};
