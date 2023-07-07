import Image from 'next/image';
import styles from './page.module.css';
import {PiInfinityDuotone} from 'react-icons/pi';
import Poster from '@/components/Poster/Poster';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {'<'}Next <PiInfinityDuotone />
        {'/>'}
      </h1>
      <p className={styles.description}>
        A collection of projects & mini-apps built with Next.js
      </p>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Projects</h2>
        <ol className={styles.apps}>
          <Poster poster='/img/next-events.png' link='/next-events'>
            Next Events
          </Poster>
        </ol>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Mini-Apps</h2>
        <ol className={styles.apps}>
          <Poster poster='/img/drum-kit.png' link='/mini-apps/drum-kit'>
            Drum Kit
          </Poster>
          <Poster poster='/img/analog-clock.png' link='/mini-apps/analog-clock'>
            Analog Clock
          </Poster>
        </ol>
      </section>
    </main>
  );
}
