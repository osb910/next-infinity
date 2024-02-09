import styles from './HomePage.module.css';
import Spinner from '@/ui/Spinner';

const HomePageLoading = () => {
  return (
    <>
      <h1>
        Posts <Spinner />
      </h1>
    </>
  );
};

export default HomePageLoading;
