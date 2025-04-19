import {
  Resend,
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
} from 'resend';
import {jsonifyError} from './helpers';

export type Postman = Omit<CreateEmailOptions, 'to' | 'from'> & {
  title: string;
  sender: string;
  to: string | Array<string>;
  domain?: string;
};

const postman = async (
  mail: Postman,
  requestOptions?: CreateEmailRequestOptions
) => {
  const {to, subject, title, sender, domain, ...rest} = mail;
  if (!process.env.RESEND_API_KEY) {
    return jsonifyError({
      code: 500,
      message: 'RESEND_API_KEY is not defined',
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const from = `${title} ${'<'}${sender}@${domain ?? 'resend.dev'}>`;

  const recipient = Array.isArray(to) ? to : [to];

  try {
    const {data, error} = await resend.emails.send(
      {
        from,
        to: recipient,
        subject,
        ...rest,
        react: rest.react,
      },
      requestOptions
    );

    if (error || !data) {
      return jsonifyError({code: 500, message: error?.message});
    }

    return {
      status: 'success',
      message: 'Email sent successfully',
      code: 200,
      data,
    };
  } catch (err) {
    return jsonifyError({err});
  }
};

export default postman;
