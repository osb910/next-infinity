import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import cls from './PyRegex.module.css';
import RegexTester from '@/components/py-regex/RegexTester';

export const metadata: Metadata = {
  title: 'PyRegex',
};

const PyRegexPage: AppPage = async ({}) => {
  return (
    <main className={cls.main}>
      <RegexTester />
    </main>
  );
};

export default PyRegexPage;
