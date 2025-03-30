import {type NextRequest, NextResponse} from 'next/server';
import User, {type IUser} from '@/services/next-stores/user';
import {signUpValidator} from '@/lib/validators';
import {MongoServerError} from 'mongodb';
import {type HydratedDocument} from 'mongoose';
import {defaultLocale, localize} from '@/l10n';
import {jsonifyError} from '@/lib/helpers';

export const POST = async (req: NextRequest) => {
  const [{validated, errorMap}, {l6e}] = await Promise.all([
    signUpValidator(await req.json()),
    localize(defaultLocale),
  ]);
  const {email, name, password} = validated;
  if (errorMap.count) {
    const json = jsonifyError({
      code: 422,
      errorMap,
      message: l6e('auth.invalidInput'),
    });
    return NextResponse.json(json, {status: json.code});
  }

  const user = new User({email, name, password});
  try {
    const res = (await user.save()) as IUser;
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
