'use client';

import {useState, useRef, ChangeEvent, KeyboardEvent} from 'react';

import styles from './Search.module.css';
import ky from 'ky';
import Link from 'next/link';
import Spinner from '../Spinner';
import {IStore} from '@/entities/next-stores/store/store.model';
import {VscCaseSensitive} from 'react-icons/vsc';
interface SearchProps {}

const Search = ({}: SearchProps) => {
  const [results, setResults] = useState<IStore[] | string>([]); // TODO: type this
  const [loading, setLoading] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const caseRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (evt: KeyboardEvent) => {
    evt.key === 'Escape' && setResults([]);

    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(evt.key)) return;
    ['ArrowDown', 'ArrowUp', 'Enter'].includes(evt.key) && evt.preventDefault();

    const searchResults = searchResultsRef.current;
    if (!searchResults) return;
    const focused = document.activeElement as HTMLElement;
    const closestResult = focused.closest('.search-result');

    if (evt.key === 'ArrowDown') {
      const next = (closestResult?.nextElementSibling?.firstChild ??
        searchResults.firstChild?.firstChild) as HTMLAnchorElement;
      next.focus();
    }

    if (evt.key === 'ArrowUp') {
      const prev = (closestResult?.previousElementSibling?.firstChild ??
        searchResults.lastElementChild?.firstChild) as HTMLAnchorElement;
      prev.focus();
    }

    if (!closestResult) return;

    if (evt.key === 'Enter') {
      (closestResult.firstChild as HTMLAnchorElement).click();
      setResults([]);
    }
  };

  const runSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    if (query.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await ky.get(
        `/api/next-stores/search?q=${query}&case-sensitive=${caseRef.current?.checked}`,
        {
          timeout: 20000,
          throwHttpErrors: false,
          cache: 'no-store',
        }
      );
      const {status, stores, message} = (await res.json()) as
        | {status: 'success'; stores: IStore[]; message: string}
        | {status: 'error' | 'notice'; message: string; stores?: IStore[]};
      status === 'error' || status === 'notice'
        ? setResults(message)
        : status === 'success'
        ? setResults(stores)
        : setResults('Something went wrong.');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  return (
    <div className={styles.search} onKeyDown={handleKeyDown}>
      <input
        type='text'
        className={styles.searchInput}
        placeholder='Coffee, tea...'
        name='search'
        onInput={runSearch}
      />
      <p className={styles.control}>
        <input
          type='checkbox'
          name='caseSensitive'
          id='caseSensitive'
          ref={caseRef}
        />
        <label htmlFor='caseSensitive' title='Case sensitive'>
          <VscCaseSensitive />
        </label>
      </p>
      <ul className={styles.searchResults} ref={searchResultsRef}>
        {loading && (
          <span className={styles.centered}>
            <Spinner />
          </span>
        )}
        {typeof results === 'string' ? (
          <p className={styles.searchResult}>{results}</p>
        ) : (
          results.map(store => (
            <li
              key={store._id?.toString()}
              data-slug={store.slug}
              className='search-result'
            >
              <Link
                href={`/next-stores/stores/${store.slug}`}
                className={`${styles.searchResult}`}
              >
                <strong>{store.name}</strong>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Search;
