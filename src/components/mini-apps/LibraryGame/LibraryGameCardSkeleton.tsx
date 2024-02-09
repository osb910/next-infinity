import {LoremIpsum} from 'lorem-ipsum';

import {randNum} from '@/utils/general';

const lorem = new LoremIpsum();

export function LibraryGameCardSkeleton() {
  return (
    <article className='library-game-card skeleton' aria-hidden='true'>
      <div className='hero-img'></div>
      <h2>{lorem.generateWords(randNum(4, 2))}</h2>
      <p>{lorem.generateWords(randNum(40, 20))}</p>
      <dl>
        <dt>Time played</dt>
        <dd>{randNum(500, 0)} hours</dd>
        <dt>Achievements</dt>
        <dd>
          {randNum(10, 0)} <span className='normal-font'>/</span>{' '}
          {randNum(20, 4)}
        </dd>
      </dl>
    </article>
  );
}
