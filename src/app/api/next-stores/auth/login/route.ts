import {type NextRequest, NextResponse} from 'next/server';
import {type HydratedDocument} from 'mongoose';
import User, {type IUser} from '@/services/next-stores/user';
import {signJWT} from '@/lib/token';
import {loginValidator} from '@/lib/validators';
import {env, jsonifyError} from '@/lib/helpers';
import {defaultLocale, localize} from '@/l10n';
import {nextDBConnect} from '@/lib/db';

export const POST = async (req: NextRequest) => {
  const {validated, errorMap} = loginValidator(await req.json());
  const {email, password} = validated;
  const {l6e} = await localize(defaultLocale);
  if (errorMap.count) {
    const json = jsonifyError({
      code: 422,
      errorMap,
      message: l6e('auth.invalidInput'),
    });
    return NextResponse.json(json, {status: json.code});
  }

  try {
    await nextDBConnect();
    const user = (await User.findOne({email})) as HydratedDocument<IUser> & {
      _doc: IUser;
    };

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'User not found',
        },
        {status: 404}
      );
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Invalid credentials',
        },
        {status: 401}
      );
    }

    const nextStoresToken = await signJWT(
      {key: 'NEXT_STORES_JWT_SECRET', sub: user._id.toString()},
      {exp: `${env('JWT_EXPIRES_IN')}m`}
    );

    const response = new NextResponse(
      JSON.stringify({
        status: 'success',
        message: `Welcome back, ${user.name}!`,
        data: {...user._doc, password: undefined},
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const tokenMaxAge = +(env('JWT_EXPIRES_IN') ?? '') * 60;
    const tokenCookie = {
      name: 'nextStoresToken',
      value: nextStoresToken,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: tokenMaxAge,
    };
    const userIdCookie = {
      name: 'next-stores-user-id',
      value: user._id.toString(),
      maxAge: tokenMaxAge,
    };

    await Promise.all([
      response.cookies.set(tokenCookie),
      response.cookies.set(userIdCookie),
    ]);

    return response;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {message: err.message, status: 'error'},
      {status: 500}
    );
  }
};
