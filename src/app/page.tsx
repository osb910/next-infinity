import {join} from 'path';
import Link from 'next/link';
import Poster from '@/components/Poster/Poster';
import Logo from '@/components/Logo';
import {calculateDirSize, getDirNames} from '@/utils/file';
import styles from './page.module.css';

const Home = async () => {
  try {
    const packages = await import('../../package.json');
    const nextVersion = packages.dependencies.next.replace(
      /\^(\d+\.\d+)\.\d+/,
      '$1'
    );
    const appPath = 'src/app';
    const appDirPromise = getDirNames(appPath);
    const miniAppsDirPromise = getDirNames(`${appPath}/mini-apps`);
    const [appDir, miniAppsDir] = await Promise.all([
      appDirPromise,
      miniAppsDirPromise,
    ]);

    const projectsPromises = appDir
      .filter(
        ({name}) =>
          ![
            'api',
            'mini-apps',
            'nasa-mission-control',
            'test',
            'py-regex',
          ].includes(name)
      )
      .map(async ({name}) => ({
        name,
        size: await calculateDirSize(join(appPath, name)),
      }));

    const miniAppsPromises = miniAppsDir.map(async ({name}) => ({
      name,
      size: await calculateDirSize(join(appPath, 'mini-apps', name)),
    }));

    const [projects, miniApps] = await Promise.all([
      Promise.all(projectsPromises),
      Promise.all(miniAppsPromises),
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
              {projects
                .sort((a, b) => b.size - a.size)
                .map(({name}) => (
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
              {miniApps
                .sort((a, b) => b.size - a.size)
                .map(({name}) => (
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
