'use client';

import {useCallback, useEffect, useState} from 'react';
import ky from 'ky';
import Form from '@/ui/Form';
import useIsOnscreen from '@/hooks/useIsOnscreen';
import Spinner from '@/ui/Spinner';
import {P8nProps} from '../types';
import {P8n} from '@/types';
import styles from '../Pagination.module.css';

interface PaginationProps extends P8nProps {
  endpoint: string;
  addItems: (data: Array<any>) => void;
  type?: 'manual' | 'auto';
  observedSelector?: string;
}

export const LoaderPagination = ({
  page,
  pages,
  endpoint,
  addItems,
  buttonText = 'Load more...',
  type = 'manual',
  observedSelector,
}: PaginationProps) => {
  const [chunkPage, setChunkPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnScreen] = useIsOnscreen(observedSelector);

  const loadMore = useCallback(async () => {
    const newUrl = new URL(endpoint);
    newUrl.searchParams.set('p', (chunkPage + 1).toString());
    setIsLoading(true);
    const json = (await ky
      .get(newUrl.toString(), {
        headers: {
          'User-Agent': '*',
          Accept: 'application/json, text/plain, */*',
        },
        throwHttpErrors: false,
      })
      .json()) as {
      status: string;
      message: string;
      data: Array<any>;
    } & P8n;
    if (json.status === 'error') throw new Error(json.message);
    addItems(json.data);
    setChunkPage(json.page);
    setIsLoading(false);
  }, [chunkPage, endpoint, addItems]);

  useEffect(() => {
    if (type === 'manual' || !isOnScreen || chunkPage >= pages) return;
    (async () => await loadMore())();
  }, [type, isOnScreen, chunkPage, pages, loadMore]);

  if (pages < 2) return null;

  return (
    <section className={styles.pagination}>
      {type === 'manual' && pages > 1 && chunkPage < pages && (
        <Form submitHandler={loadMore} submitText={buttonText}>
          <></>
        </Form>
      )}
      {type === 'auto' && isLoading && <Spinner />}
    </section>
  );
};

export default LoaderPagination;
