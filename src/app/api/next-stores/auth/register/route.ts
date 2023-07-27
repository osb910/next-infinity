import User, {IUser} from '@/entities/next-stores/user/user.model';
import {NextRequest, NextResponse} from 'next/server';
import {registerValidator} from '@/lib/validators';
import {MongoServerError} from 'mongodb';
import {HydratedDocument} from 'mongoose';

export const POST = async (req: NextRequest) => {
  const [body, errors] = await registerValidator(await req.json());
  const {email, name, password} = body;
  if (errors.length)
    return NextResponse.json({errors, status: 'error'}, {status: 422});

  const user = new User({email, name, password});
  try {
    const res = (await user.save()) as HydratedDocument<IUser> & {
      _doc: HydratedDocument<IUser>;
    };
    return NextResponse.json(
      {status: 'success', message: 'User created', data: res._doc},
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    if (err instanceof MongoServerError && err.code === 11000) {
      return NextResponse.json(
        {
          status: 'notice',
          message: `${Object.keys(err.keyPattern)[0]} ${
            err.keyValue[Object.keys(err.keyPattern)[0]]
          } already exists.`,
        },
        {status: 409}
      );
    }
    return NextResponse.json(
      {message: err.message, status: 'error'},
      {status: 500}
    );
  }
};
