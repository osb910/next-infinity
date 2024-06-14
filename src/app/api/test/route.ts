import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
import pyRegex from '@/lib/text/regex/py-regex';
import which from 'which';
import {python} from 'pythonia';

export type GetRoute = AppRoute;

export const dynamic = 'force-dynamic';

export const GET: GetRoute = async (req) => {
  try {
    const py = await which('python');
    // const tk = python('regex');

    console.log({py});
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
        data: {py},
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
