import styles from './page.module.css';
import Poster from '@/components/Poster/Poster';
import {getFolderNames} from '@/utils/file';
import Logo from '@/components/Logo';
import Link from 'next/link';
import fs from 'fs/promises';
import PrettyDump from '@/ui/PrettyDump';
import {join} from 'path';

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
// export const dynamic = 'force-dynamic';
export const revalidate = 0;

const projects = ['next-blog', 'next-events', 'next-stores'];

const miniApps = [
  'analog-clock',
  'array-cardio',
  'drum-kit',
  'flex-image-gallery',
  'interview',
  'next-projects',
  'scoped-css-var',
  'vapor',
  'web-base',
];

const Home = async () => {
  try {
    const packages = await import('../../package.json');
    const nextVersion = packages.dependencies.next.replace(
      /\^(\d+\.\d+)\.\d+/,
      '$1'
    );
    console.log(await fs.readdir(join(process.cwd(), 'src')));
    console.log(await fs.readdir(join(process.cwd(), '.next')));
    const appFolder = await getFolderNames(
      join(process.cwd(), '.next/server/app')
    );
    console.log({appFolder});
    const projects = appFolder.filter(
      name => !['api', 'mini-apps', 'nasa-mission-control'].includes(name)
    );
    const miniApps = await getFolderNames(
      join(process.cwd(), '.next/server/app/mini-apps')
    );
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
              {projects.sort().map(name => (
                <Poster poster={`/img/${name}.png`} link={name} key={name}>
                  {name
                    .split('-')
                    .map(word => word[0].toUpperCase() + word.slice(1))
                    .join(' ')}
                </Poster>
              ))}
            </ol>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>Mini-Apps ({miniApps.length})</h2>
            <ol className={styles.apps}>
              {miniApps.sort().map(name => (
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
            </ol>
          </section>
          <PrettyDump data={await fs.readdir(join(process.cwd()))} />
          <PrettyDump data={appFolder} />
        </main>
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Home;
