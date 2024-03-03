import {type NextRequest, NextResponse} from 'next/server';
import {contactValidator} from '@/lib/validators';
import {createMsg} from '@/services/next-blog/message';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData();
    const {email, name, message} = Object.fromEntries(body.entries());
    const {validated, errorMap} = contactValidator({email, name, message});
    if (errorMap.count)
      return NextResponse.json(
        {
          status: 'error',
          message: 'Invalid input. Please fix any errors and try again.',
          code: 422,
          data: {errors: errorMap},
        },
        {status: 422}
      );
    const {doc} = await createMsg({
      email: validated.email,
      name: validated.name,
      body: validated.message,
    });
    return NextResponse.json(
      {
        status: 'success',
        message: 'Message received. Thank you.',
        data: doc,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};
