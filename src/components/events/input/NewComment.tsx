'use client';
import {FormEvent, useRef, useState} from 'react';
import styles from './NewComment.module.css';
import {useToaster} from '@/ui/Toaster';
import Spinner from '@/ui/Spinner';
import {isEmail} from '@/utils/validators';

export type Comment = {
  _id?: string;
  email: string;
  author: string;
  comment: string;
};

const NewComment = ({
  onAddComment,
}: {
  onAddComment: (commentData: Comment) => Promise<void>;
}) => {
  const {createToast} = useToaster();

  const emailRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);

  const sendComment = async (evt: FormEvent) => {
    evt.preventDefault();

    const email = emailRef.current?.value;
    const author = authorRef.current?.value;
    const comment = commentRef.current?.value;

    if (
      !email ||
      !isEmail(email) ||
      !author ||
      author.trim() === '' ||
      !comment ||
      comment.trim() === ''
    ) {
      createToast(
        'warning',
        'Please enter a valid email address, name, and comment!'
      );
      return;
    }
    setIsSending(true);
    try {
      await onAddComment({email, author, comment});
    } catch (err) {
      console.log(err);
    }
    setIsSending(false);
  };

  return (
    <form className={styles.form} onSubmit={sendComment}>
      <div className={styles.row}>
        <p className={styles.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailRef} />
        </p>
        <p className={styles.control}>
          <label htmlFor='author'>Your name</label>
          <input dir='auto' type='text' id='author' ref={authorRef} />
        </p>
      </div>
      <p className={styles.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea dir='auto' id='comment' rows={5} ref={commentRef}></textarea>
      </p>
      <button disabled={isSending}>Submit {isSending && <Spinner />}</button>
    </form>
  );
};

export default NewComment;
