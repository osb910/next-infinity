'use client';
import {FormEvent, useRef} from 'react';
import ButtonLink from '../ButtonLink/ButtonLink';
import styles from './EventsSearch.module.css';
import {useRouter} from 'next/navigation';

const EventsSearch = () => {
  const yearRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const router = useRouter();
  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const [year, month] = [yearRef.current!.value, monthRef.current!.value];
    router.push(`/next-events/events/${year}/${month}`);
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <p className={styles.control}>
        <label htmlFor='year'>Year</label>
        <select ref={yearRef} name='year' id='year'>
          <option value='2021'>2021</option>
          <option value='2022'>2022</option>
          <option value='2023'>2023</option>
        </select>
      </p>
      <p className={styles.control}>
        <label htmlFor='month'>Month</label>
        <select ref={monthRef} name='month' id='month'>
          <option value='1'>January</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </select>
      </p>
      <ButtonLink>Find Events</ButtonLink>
    </form>
  );
};

export default EventsSearch;
