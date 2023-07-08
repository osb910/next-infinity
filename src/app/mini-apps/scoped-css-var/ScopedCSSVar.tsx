import Header from '@/components/Header/Header';
import styles from './ScopedCSSVar.module.css';
import Image from 'next/image';
import Form from './Form';
const ScopedCSSVarPage = () => {
  return (
    <>
      <Header>
        <h1>Scoped CSS Variables and JS</h1>
      </Header>
      <main className={styles.main}>
        <h2>
          Update CSS Variables with <span className={styles.hl}>JS</span>
        </h2>

        <Form />

        <section className={styles.scope}>
          <Image
            width={400}
            height={250}
            alt='Green lanscape'
            src='https://source.unsplash.com/_RBcxo9AU-U/800x500'
          />
        </section>
      </main>
    </>
  );
};

export default ScopedCSSVarPage;
