import Link from 'next/link';

const NotFound = async () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link href='/'>Return Home</Link>
    </>
  );
};

export default NotFound;
