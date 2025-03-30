import FilePicker from '@/ui/FilePicker';
// import slugify from 'slugify';

const TestPage = () => {
  // const slug = slugify('Hello World', {lower: true});
  return (
    <main>
      <FilePicker accept='image/png' />
    </main>
  );
};

export default TestPage;
