import styles from './page.module.css';
import Poster from '@/components/Poster/Poster';
import {getFolderNames} from '@/utils/file';
import Logo from '@/components/Logo';
import Link from 'next/link';

// const dirSize = async (dir: string): Promise<number> => {
//   const files = await readdir(dir, {withFileTypes: true});

//   const paths = files.map(async file => {
//     const path = join(dir, file.name);

//     if (file.isDirectory()) return await dirSize(path);

//     if (file.isFile()) {
//       const {size} = await stat(path);

//       return size;
//     }

//     return 0;
//   });

//   return (await Promise.all(paths))
//     .flat(Infinity)
//     .reduce((i, size) => i + size, 0);
// };

const Home = async () => {
  try {
    const packages = await import('../../package.json');
    const nextVersion = packages.dependencies.next.replace(
      /\^(\d+\.\d+)\.\d+/,
      '$1'
    );
    console.log({nextVersion});
    const appFolder = await getFolderNames('./app');
    // const projects = appFolder.filter(
    //   name => !['api', 'mini-apps', 'nasa-mission-control'].includes(name)
    // );
    // const miniApps = await getFolderNames('./app/mini-apps');
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
            <h2 className={styles.subtitle}>Projects ({appFolder.length})</h2>
            <ol className={styles.apps}>
              {/* {appFolder.map(name => (
                <Poster poster={`/img/${name}.png`} link={name} key={name}>
                  {name
                    .split('-')
                    .map(word => word[0].toUpperCase() + word.slice(1))
                    .join(' ')}
                </Poster>
              ))} */}
            </ol>
          </section>
          <section className={styles.section}>
            {/* <h2 className={styles.subtitle}>Mini-Apps ({miniApps.length})</h2> */}
            {/* <ol className={styles.apps}>
            {miniApps.map(name => (
              <Poster
                poster={`/img/${name}.png`}
                link={`/mini-apps/${name}`}
                key={name}
              >
                {name
                  .split('-')
                  .map(word => word[0].toUpperCase() + word.slice(1))
                  .join(' ')}
              </Poster>
            ))}
          </ol> */}
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
