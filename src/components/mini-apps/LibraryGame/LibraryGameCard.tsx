import {type Game} from '@/helpers/vapor-helpers';
import Image from 'next/image';

function LibraryGameCard({game}: {game: Game}) {
  return (
    <article className='library-game-card'>
      <div className='hero-img'>
        <Image
          alt=''
          src={`/img/game-covers/${game.slug}.jpeg`}
          width={480}
          height={240}
        />
      </div>
      <h2>{game.name}</h2>
      <p>{game.description}</p>
      <dl>
        <dt>Time played</dt>
        <dd>{game.totalPlayed} hours</dd>
        <dt>Achievements</dt>
        <dd>
          {game.achievements.granted} / {game.achievements.total}
        </dd>
      </dl>
    </article>
  );
}

export default LibraryGameCard;
