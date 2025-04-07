'use client';
import {useState} from 'react';

import CommentList from './CommentList';
import NewComment, {Comment} from './NewComment';
import styles from './Comments.module.css';
import {useToaster} from '@/ui/Toaster';
import ky from 'ky';

const Comments = ({event, comments}: {event: string; comments: Comment[]}) => {
  const [showComments, setShowComments] = useState(false);
  const [clientComments, setClientComments] = useState<Comment[]>(comments);
  const {createToast} = useToaster();

  const toggleComments = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addComment = async (commentData: Comment) => {
    try {
      const json: any = await ky
        .put(`/api/events/${event}/comment`, {json: commentData})
        .json();
      setClientComments((current) => [
        {...json, _id: crypto.randomUUID()},
        ...current,
      ]);
      createToast(json.status, json.message);
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.log(err);
      createToast('error', `Failed to add comment!\n${err.message}`);
    }
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addComment} />}
      {showComments && <CommentList comments={clientComments} />}
    </section>
  );
};

export default Comments;
