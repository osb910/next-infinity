'use client';
import Header from '@/components/Header/Header';
import {useState} from 'react';
import styles from './ArrayCardio.module.css';
import FilterInventorsForm from './FilterInventorsForm';
import BoulevardsForm from './BoulevardsForm';
import PeopleForm from './PeopleForm';
import WordsForm from './WordsForm';

const ArrayCardio = () => {
  const [result, setResult] = useState<any>([]);

  return (
    <>
      <Header>
        <h1>Array Cardio</h1>
      </Header>
      <main className={styles.main}>
        <h2 className={styles.subtitle}>
          Query about people, places, and stuff
        </h2>
        {result.length > 0 && (
          <section className={styles.answer}>
            {result.map((i: any) => (
              <p key={i}>{i}</p>
            ))}
          </section>
        )}
        <FilterInventorsForm setData={setResult} />
        <BoulevardsForm setData={setResult} />
        <PeopleForm setData={setResult} />
        <WordsForm setData={setResult} />
      </main>
    </>
  );
};

export default ArrayCardio;
