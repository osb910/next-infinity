import {LibraryGameCardSkeleton} from '@/components/mini-apps/LibraryGame/LibraryGameCardSkeleton';
import {range} from '@/utils/numbers';

const HomePageLoading = () => {
  return (
    <section className='max-width-wrapper'>
      <header className='library-header'>
        <h1>My games</h1>
      </header>
      <div className='game-grid'>
        {range(12).map(num => (
          <LibraryGameCardSkeleton key={num} />
        ))}
      </div>
    </section>
  );
};

export default HomePageLoading;
