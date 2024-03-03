import sendEmail from '@/lib/email-sender';
import Message from '../message.model';
import {IMessage} from '../message.types';
import ContactEmail from '@/components/email-templates/ContactEmail';
export const createMsg = async ({
  email,
  name,
  body,
}: Pick<IMessage, 'email' | 'name' | 'body'>) => {
  const newMessage = new Message({
    email,
    name,
    body,
  });
  const docPromise = newMessage.save();
  const sentEmailPromise = sendEmail({
    email: 'omarshdev@gmail.com',
    subject: `Message from ${name}`,
    react: ContactEmail({
      email,
      name,
      body,
    }),
    username: 'next-blog',
  });
  const [doc, sentEmail] = await Promise.all([docPromise, sentEmailPromise]);
  return {
    doc,
    sentEmail,
  };
};
