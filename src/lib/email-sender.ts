import {Resend} from 'resend';

export type Email = {
  email: string;
  subject: string;
  react: JSX.Element;
  sender?: string;
  username?: string;
};

export default async function sendEmail({
  email,
  subject,
  react,
  sender = 'Omar',
  username = 'next',
}: Email) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const {data, error} = await resend.emails.send({
      from: `${sender} <${username}@resend.dev>`,
      to: [email],
      subject,
      react,
    });
    console.log({data});
    if (error || !data) {
      throw new Error(error!.message);
    }
    return data;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
  }
}
