import {type NextRequest, NextResponse} from 'next/server';
import {contactValidator} from '@/lib/validators';
import {createMsg} from '@/services/next-blog/message';
import {jsonifyError} from '@/lib/helpers';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData();
    const {email, name, message} = Object.fromEntries(body.entries());
    const {validated, errorMap} = contactValidator({
      email: email.toString(),
      name: name.toString(),
      message: message.toString(),
    });
    if (errorMap.count)
      return NextResponse.json(
        jsonifyError({
          code: 422,
          errorMap,
          message: 'Invalid input. Please fix any errors and try again.',
        }),
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
        code: 200,
        message: 'Message received. Thank you.',
        data: doc,
      },
      {status: 200}
    );
  } catch (err) {
    return NextResponse.json(jsonifyError({err}), {status: 500});
  }
};
