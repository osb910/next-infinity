import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};
const NotFound = async () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link href='/next-blog'>Return Home</Link>
    </>
  );
};

export default NotFound;
