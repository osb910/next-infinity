import {join} from 'path';
import Link from 'next/link';
import Poster from '@/components/Poster/Poster';
import Logo from '@/components/Logo';
import {env} from '@/lib/helpers';
import {calculateDirSize, getFolderNames} from '@/utils/file';
import {getPath} from '@/utils/path';
import styles from './page.module.css';
import PrettyDump from '@/ui/PrettyDump';

const Home = async () => {
  try {
    const packages = await import('../../package.json');
    const nextVersion = packages.dependencies.next.replace(
      /\^(\d+\.\d+)\.\d+/,
      '$1'
    );
    const appPath =
      env('NODE_ENV') === 'development' ? 'src/app' : '.next/server/app';
    const appDir = await getFolderNames(appPath);
    const projectsPromises = appDir
      .filter(
        name => !['api', 'mini-apps', 'nasa-mission-control'].includes(name)
      )
      .map(async dir => ({
        name: dir,
        size: await calculateDirSize(join(appPath, dir)),
      }));
    const projects = await Promise.all(projectsPromises);

    const miniAppsDir = await getFolderNames(join(appPath, 'mini-apps'));
    const miniAppsPromises = miniAppsDir.map(async dir => ({
      name: dir,
      size: await calculateDirSize(join(appPath, 'mini-apps', dir)),
    }));
    const miniApps = await Promise.all(miniAppsPromises);

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
                      .map(word => word[0].toUpperCase() + word.slice(1))
                      .join(' ')}
                  </Poster>
                ))}
            </ol>
          </section>
        </main>
        <PrettyDump data={join(process.cwd())} />
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Home;
