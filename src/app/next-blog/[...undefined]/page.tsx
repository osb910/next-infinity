import Link from 'next/link';
import type {AppPage, GetMetadata} from '@/types';
// import cls from '../HomePage.module.css';
import {getLocale} from '@/l10n/getL10n';
import {localize} from '@/l10n';

type Params = {undefined: Array<string>};
type SearchParams = {type: string};
type UndefinedPg = AppPage<Params, SearchParams>;

type UndefinedMetadata = GetMetadata<Params, SearchParams>;

export const generateMetadata: UndefinedMetadata = async ({
  params,
  searchParams,
}) => {
  const [{undefined}, {type}, locale] = await Promise.all([
    params,
    searchParams,
    getLocale(),
  ]);
  const {l6e} = await localize(locale);
  return {
    title: l6e('nextBlog.home.notFound.title', {
      pageType: type,
    }),
    description: l6e('nextBlog.home.notFound.description', {
      pageType: type,
      path: undefined.join('/'),
    }),
  };
};

const Undefined: UndefinedPg = async ({params, searchParams}) => {
  const [{undefined}, {type}, locale] = await Promise.all([
    params,
    searchParams,
    getLocale(),
  ]);
  const {l6e} = await localize(locale);
  return (
    <>
      <h1>
        {l6e('nextBlog.home.notFound.title', {
          pageType: type,
        })}
      </h1>
      <section>
        <p>
          {l6e('nextBlog.home.notFound.description', {
            pageType: type,
            path: undefined.join('/'),
          })}
        </p>
        <Link href='/next-blog'>{l6e('nextBlog.home.notFound.goHome')}</Link>
      </section>
    </>
  );
};

export default Undefined;
