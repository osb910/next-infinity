import FilePicker from '@/ui/FilePicker';
import slugify from 'slugify';

interface TestPageProps {}

const TestPage = ({}: TestPageProps) => {
  const slug = slugify('Hello World', {lower: true});
  console.log({slug});
  return (
    <main>
      <FilePicker />
    </main>
  );
};

export default TestPage;