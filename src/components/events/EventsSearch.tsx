'use client';
import ButtonLink from '../ButtonLink/ButtonLink';
import styles from './EventsSearch.module.css';
import SearchForm from '../SearchForm/SearchForm';

const EventsSearch = () => {
  return (
    <SearchForm searchPath='/next-events/events/search' className={styles.form}>
      <p className={styles.control}>
        <label htmlFor='year'>Year</label>
        <select name='year' id='year'>
          <option value='2023'>2023</option>
          <option value='2024'>2024</option>
          <option value='2025'>2025</option>
        </select>
      </p>
      <p className={styles.control}>
        <label htmlFor='month'>Month</label>
        <select name='month' id='month'>
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
    </SearchForm>
  );
};

export default EventsSearch;
