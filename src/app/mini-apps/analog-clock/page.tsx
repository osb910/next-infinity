import styles from './page.module.css';

import Clock from '@/components/Clock/Analog';

const AnalogClock = () => {
  return (
    <main className={styles.main}>
      <Clock />
    </main>
  );
};

export default AnalogClock;
