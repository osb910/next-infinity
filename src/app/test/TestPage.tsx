import FilePicker from '@/ui/FilePicker';
import slugify from 'slugify';

interface TestPageProps {}

const TestPage = ({}: TestPageProps) => {
  const slug = slugify('Hello World', {lower: true});
  return (
    <main>
      <FilePicker accept='image/png' />
    </main>
  );
};

export default TestPage;
