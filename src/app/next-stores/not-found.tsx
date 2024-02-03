import Link from 'next/link';
import type {AppPage} from '@/types';

const NotFound: AppPage = async ({params}) => {
  console.log(params);
  return (
    <>
      <h1>Page not found</h1>
      <Link href='/next-stores'>Return Home</Link>
    </>
  );
};

export default NotFound;
