import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
// import pyRegex from '@/lib/text/regex/py-regex';
import {PythonShell} from 'python-shell';
import {getPath} from '@/utils/path';
import {execSync} from 'child_process';

export type GetRoute = AppRoute;

export const dynamic = 'force-dynamic';

type Mode = 'text' | 'json' | 'binary' | undefined;

export const GET: GetRoute = async (req) => {
  const isWin = process.platform === 'win32';
  const pythonDir = `src/python/${isWin ? 'windows' : 'linux'}`;
  const pythonExe = getPath(`${pythonDir}/bin/python${isWin ? '' : '3'}`);
  const pipExe = getPath(`${pythonDir}/${isWin ? 'Scripts' : 'bin'}/pip`);
  const libDir = `${pythonDir}/${isWin ? 'Lib' : 'lib/python3.12'}`;
  const pyPiLibDir = getPath(`${libDir}/site-packages`);

  let options = {
    mode: 'json' as Mode,
    pythonPath: pythonExe as string,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: getPath('/src/python/py-regex'),
    args: ['findall', '\\w+', 'Hello, world.', '--flags', 'imv'],
  };
  try {
    // const installPip = execSync(
    //   `${pythonExe} -m ensurepip --upgrade`
    // ).toString();
    // console.log({installPip});
    const installRegex = execSync(
      `${pipExe} install --target ${pyPiLibDir} regex --upgrade`
    ).toString();
    const res = await PythonShell.run('pypi-regex.py', options);

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
        data: {pythonExe, installRegex, res},
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
