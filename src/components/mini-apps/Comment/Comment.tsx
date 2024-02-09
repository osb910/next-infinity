import {TComment} from '@/helpers/interview-helpers';
import Image from 'next/image';

const Comment = ({comment}: {comment: TComment}) => {
  return (
    <article className='comment'>
      <header>
        <Image
          alt=''
          src={`/img${comment.from.avatarSrc}`}
          width={96}
          height={96}
        />
        {comment.from.name}
      </header>
      <p>{comment.body}</p>
      <footer>Posted {comment.postedAt}</footer>
    </article>
  );
};

export default Comment;
