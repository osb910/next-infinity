'use client';
import ButtonLink from '../ButtonLink/ButtonLink';
import styles from './EventsSearch.module.css';
import SearchForm from '../SearchForm/SearchForm';

const EventsSearch = ({
  type,
  year,
  month,
  q,
}: {
  type?: 'any' | 'upcoming' | 'past';
  year?: string;
  month?: string;
  q?: string;
}) => {
  return (
    <SearchForm
      searchPath='/next-events/events/search'
      className={styles.form}
    >
      <p className={styles.control}>
        <label htmlFor='type'>Type</label>
        <select
          name='type'
          id='type'
          defaultValue={type}
        >
          <option value='any'>Any</option>
          <option value='upcoming'>Upcoming</option>
          <option value='past'>Past</option>
        </select>
      </p>
      <p className={styles.control}>
        <label htmlFor='year'>Year</label>
        <select
          name='year'
          id='year'
          defaultValue={year}
        >
          <option value='any'>Any</option>
          <option value='2023'>2023</option>
          <option value='2024'>2024</option>
          <option value='2025'>2025</option>
        </select>
      </p>
      <p className={styles.control}>
        <label htmlFor='month'>Month</label>
        <select
          name='month'
          id='month'
          defaultValue={month}
        >
          <option value='any'>Any</option>
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
      <p className={styles.control}>
        <label htmlFor='q'>Query</label>
        <input
          type='text'
          id='q'
          name='q'
          defaultValue={q}
        />
      </p>
      <ButtonLink>Find Events</ButtonLink>
    </SearchForm>
  );
};

export default EventsSearch;
