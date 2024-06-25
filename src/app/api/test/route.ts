import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
// import pyRegex from '@/lib/text/regex/py-regex';
import which from 'which';
import {PythonShell} from 'python-shell';
import {getPath} from '@/utils/path';
import {execSync} from 'child_process';
import {getDirNames, readDir} from '@/utils/file';

export type GetRoute = AppRoute;

export const dynamic = 'force-dynamic';

type Mode = 'text' | 'json' | 'binary' | undefined;

export const GET: GetRoute = async (req) => {
  // const pyPath = python()
  const isWin = process.platform === 'win32';
  const pythonDir = `src/python/${isWin ? 'windows' : 'linux'}`;
  const pythonExe = getPath(`${pythonDir}/bin/python${isWin ? '' : '3'}`);
  const vercelPy = getPath('../lang/bin/python3.9');
  const vercelCorePackDir = await readDir('../lang/bin/corepack');
  const vercelNodeDir = await readDir('../lang/bin/node');
  const vercelNpmDir = await readDir('../lang/bin/npm');
  const vercelNpxDir = await readDir('../lang/bin/npx');
  // const pipExe = getPath(`${pythonDir}/${isWin ? 'Scripts' : 'bin'}/pip`);
  // const libDir = `${pythonDir}/${isWin ? 'Lib' : 'lib/python3.12'}`;
  // const pyPiLibDir = getPath(`${libDir}/site-packages`);

  // if (process.platform === 'linux') {
  //   execSync(`chmod +x ${vercelPy}`);
  //   execSync(`chmod +x ${vercelPy.replace(/3(\.\d+)?$/, '')}`);
  //   // execSync(`chmod +x ${pipExe}`)
  // }

  let options = {
    mode: 'json' as Mode,
    pythonPath: vercelPy as string,
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: getPath('/src/python/py_regex'),
    args: ['findall', '\\w+', 'Hello, people!', '--flags', 'imv'],
  };
  try {
    // const installRegex = execSync(
    //   `${pipExe} install --target ${pyPiLibDir} regex --upgrade`
    // ).toString();
    // const pip = execSync(
    //   `${pythonExe} -m pip install regex --trusted-host pypi.org --trusted-host files.pythonhosted.org`
    // ).toString();
    // const res = await PythonShell.run('pypi-regex.py', options);

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
        data: {
          vercelPy,
          vercelCorePackDir,
          vercelNodeDir,
          vercelNpmDir,
          vercelNpxDir,
        },
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
