import sendEmail from '@/lib/email-sender';
import Message from '../message.model';
import {IMessage} from '../message.types';
import ContactEmail from '@/components/email-templates/ContactEmail';
import {nextDBConnect} from '@/lib/db';
export const createMsg = async ({
  email,
  name,
  body,
}: Pick<IMessage, 'email' | 'name' | 'body'>) => {
  nextDBConnect();
  const newMessage = new Message({
    email,
    name,
    body,
  });
  const docPromise = newMessage.save();
  const sentEmailPromise = sendEmail({
    to: 'omarshdev@gmail.com',
    title: `Message from ${name}`,
    subject: `Message from ${name}`,
    react: ContactEmail({
      email,
      name,
      body,
    }),
    sender: 'next-blog',
  });
  const [doc, sentEmail] = await Promise.all([docPromise, sentEmailPromise]);
  return {
    doc,
    sentEmail,
  };
};
