'use client';

import {useActionState, useLayoutEffect, useState} from 'react';

import CommentList from './CommentList';
import NewComment, {type Comment} from './NewComment';
import styles from './Comments.module.css';
import {useToaster} from '@/ui/Toaster';
import {createCommentAction} from '@/services/next-events/event/controllers';

const Comments = ({event, comments}: {event: string; comments: Comment[]}) => {
  const [formState, formAction, isPending] = useActionState(
    createCommentAction,
    {
      status: 'notice',
      eventParam: event,
      message: '',
      data: null,
    }
  );
  console.log({isPending});
  const [showComments, setShowComments] = useState(false);
  const [clientComments, setClientComments] = useState<Comment[]>(comments);
  const {createToast} = useToaster();

  const toggleComments = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  useLayoutEffect(() => {
    const toast = () =>
      createToast(formState.status, <p>{formState.message}</p>, 'infinite');

    if (formState.status === 'error' && formState.message) toast();

    if (formState.status === 'success' && formState.message) {
      toast();
      setClientComments(formState.data);
    }
  }, [formState, createToast]);

  return (
    <section className={styles.comments}>
      <button onClick={toggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && (
        <NewComment
          onAddComment={formAction}
          isPending={isPending}
        />
      )}
      {showComments && <CommentList comments={clientComments} />}
    </section>
  );
};

export default Comments;
