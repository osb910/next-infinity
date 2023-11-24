import {NextRequest, NextResponse} from 'next/server';
import {HydratedDocument} from 'mongoose';
import User, {IUser} from '@/entities/next-stores/user/user.model';
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

    // @ts-ignore
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

    const tokenMaxAge = parseInt(env('JWT_EXPIRES_IN')) * 60;
    const cookieOptions = {
      name: 'nextStoresToken',
      value: nextStoresToken,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: tokenMaxAge,
    };

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: 'next-stores-user-id',
        value: user._id.toString(),
        maxAge: tokenMaxAge,
      }),
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
