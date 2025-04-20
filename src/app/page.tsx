import Link from 'next/link';
import Poster from '@/components/Poster/Poster';
import Logo from '@/components/Logo';
import {getDirInfo} from '@/utils/file';
import styles from './page.module.css';
import {getDependency} from '@/utils/path';
import Magnetic from '@/ui/Magnetic';
import Button from '@/ui/Button';

const Home = async () => {
  try {
    const nextVersion = (await getDependency('next')).replace(/^\^/, '');
    const appPath = 'src/app';
    const appDirPromise = getDirInfo(appPath, {
      filter: ['api', 'mini-apps', 'test', 'py-regex'],
      getSize: true,
      sortDesc: true,
    });
    const miniAppsDirPromise = getDirInfo(`${appPath}/mini-apps`, {
      getSize: true,
      sortDesc: true,
    });

    const [projects, miniApps] = await Promise.all([
      appDirPromise,
      miniAppsDirPromise,
    ]);

    return (
      <>
        <header className={styles.header}>
          <Link href='/'>
            <Logo width='14rem' />
          </Link>
          <p className={styles.description}>
            Full-stack projects built with Next.js {nextVersion}
          </p>
        </header>
        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>Projects ({projects.length})</h2>
            <ol className={styles.apps}>
              {projects.map(({name}) => (
                <Poster
                  poster={`/img/${name}.png`}
                  link={name}
                  key={name}
                >
                  {name
                    .split('-')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' ')}
                </Poster>
              ))}
            </ol>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>Mini-Apps ({miniApps.length})</h2>
            <ol className={styles.apps}>
              {miniApps.map(({name}) => (
                <Poster
                  poster={`/img/${name}.png`}
                  link={`/mini-apps/${name}`}
                  key={name}
                >
                  {name
                    .split('-')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' ')}
                </Poster>
              ))}
            </ol>
          </section>
        </main>
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Home;
