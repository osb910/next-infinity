import React, {Suspense} from 'react';

import {getComments} from '@/helpers/interview-helpers';
import Comment from '@/components/mini-apps/Comment';
import ArticleWrapper from './ArticleWrapper';
import Spinner from '@/ui/Spinner';

export const dynamic = 'force-dynamic';

const Comments = async () => {
  const comments = await getComments();

  return comments.map(comment => (
    <Comment key={comment.id} comment={comment} />
  ));
};

function InterviewExercise() {
  return (
    <ArticleWrapper>
      <Suspense fallback={<Spinner />}>
        <Comments />
      </Suspense>
    </ArticleWrapper>
  );
}

export default InterviewExercise;
