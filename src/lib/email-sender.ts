import nodemailer from 'nodemailer';
import {Resend} from 'resend';

export type Email = {
  email: string;
  subject: string;
  react: JSX.Element;
};

export default async function sendEmail({email, subject, react}: Email) {
  // const message = {
  //   from: process.env.MAIL_USER,
  //   email,
  //   subject,
  //   text,
  //   html,
  // };

  const resend = new Resend(process.env.RESEND_API_KEY!);

  const data = await resend.emails.send({
    from: 'Omar <next@resend.dev>',
    to: [email],
    subject,
    react,
  });
  console.log({data});
  return data;
  // Create a nodemailer transporter using SMTP
  // const transporter = nodemailer.createTransport({
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //   secure: true,
  //   auth: {
  //     user: process.env.MAIL_USER,
  //     pass: process.env.MAIL_PASS,
  //   },
  // });

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'user@gmail.com',
  //     pass: 'passowrd',
  //   },
  // });

  // return transporter.sendMail(message, (err: Error | null, info) => {
  //   return err
  //     ? {
  //         error: `Connection refused for ${err.message}`,
  //       }
  //     : {
  //         success: `Message delivered to ${info.accepted}`,
  //       };
  // });
}
