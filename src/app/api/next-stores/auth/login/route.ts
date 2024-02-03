import {type NextRequest, NextResponse} from 'next/server';
import {type HydratedDocument} from 'mongoose';
import User, {type IUser} from '@/services/next-stores/user';
import {signJWT} from '@/lib/token';
import {loginValidator} from '@/lib/validators';
import {env} from '@/lib/helpers';

export const POST = async (req: NextRequest) => {
  const [body, errors] = loginValidator(await req.json());
  const {email, password} = body;
  if (errors.length) {
    return NextResponse.json(
      {
        status: 'error',
        errors,
      },
      {status: 422}
    );
  }

  try {
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

    console.log({user});

    // @ts-ignore
    const match = await user.comparePassword(password);
    console.log({match});

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
