import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
import pyRegex from '@/lib/text/regex/py-regex';
// import which from 'which';
// import {python} from 'pythonia';
import pythonExe from '@bjia56/portable-python-3.12';
import {PythonShell} from 'python-shell';
import {join} from 'path';
import {getPath} from '@/utils/path';
import {getDirNames} from '@/utils/file';

export type GetRoute = AppRoute;

export const dynamic = 'force-dynamic';

type Mode = 'text' | 'json' | 'binary' | undefined;

export const GET: GetRoute = async (req) => {
  console.log({pythonExe});
  let options = {
    mode: 'json' as Mode,
    // pythonPath: getPath('src/python/python.exe'),
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: getPath('/src/python/py-regex'),
    args: ['findall', '\\w+', 'Hello, world.', '--flags', 'imv'],
  };
  try {
    // const pathsPromises = [
    //   getDirNames('src'),
    //   getDirNames('src/python'),
    //   getDirNames('src/python/py-regex'),
    // ];
    // const [src, python, pyRegex] = await Promise.all(pathsPromises);
    // const res = await PythonShell.run('pypi-regex.py', options);
    // pyShell.on('message', function (message) {
    //   console.log(message);
    //   // res = message;
    // });
    // console.log({pyShell});
    // const tk = python('regex');

    // const res = await pyRegex({
    //   method: 'findall',
    //   text: `كَتَب كُتِب كِـتَــابًا ضُرِب`,
    //   pattern: '(?:كتاب){i:[\\p{Script_Extensions=Arabic})&&\\p{Mn}\\u0640]}',
    //   flags: ['i', 'u', 'v'],
    // });
    // console.log({res});
    // if (res.errors)
    //   return NextResponse.json(
    //     {
    //       status: 'error',
    //       message: 'Invalid regular expression',
    //       code: 422,
    //       errors: res.errors,
    //     },
    //     {status: 422}
    //   );
    return NextResponse.json(
      {
        status: 'success',
        message: 'PyRegex got a match',
        code: 200,
        data: {pythonExe},
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error('route error', err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};
