import styles from './page.module.css';
import Poster from '@/components/Poster/Poster';
import SiteLogo from '@/components/SiteLogo/SiteLogo';
import {getFolderNames} from '@/utils/file';
import {getPath} from '@/utils/path';
import {readdir, stat} from 'fs/promises';
import {join} from 'path';

const dirSize = async (dir: string): Promise<number> => {
  const files = await readdir(dir, {withFileTypes: true});

  const paths = files.map(async file => {
    const path = join(dir, file.name);

    if (file.isDirectory()) return await dirSize(path);

    if (file.isFile()) {
      const {size} = await stat(path);

      return size;
    }

    return 0;
  });

  return (await Promise.all(paths))
    .flat(Infinity)
    .reduce((i, size) => i + size, 0);
};

const Home = async () => {
  const packages = await import('../../package.json');
  const nextVersion = packages.dependencies.next.replace('^', '');
  const appFolder = await getFolderNames('./app');
  const projects = appFolder.filter(
    name => name !== 'mini-apps' && name !== 'api'
  );
  // .map(async name => ({name, size: await dirSize(getPath(`./app/${name}`))}));
  console.log(projects);
  const miniApps = await getFolderNames('./app/mini-apps');
  return (
    <>
      <header className={styles.header}>
        <SiteLogo />
        <p className={styles.description}>
          Full-stack projects & mini-apps with Next.js {nextVersion}
        </p>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Projects ({appFolder.length - 2})</h2>
          <ol className={styles.apps}>
            {projects.map(name => (
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
            <Poster
              poster='/img/next-projects.png'
              link='/mini-apps/next-projects'
            >
              Next Projects
            </Poster>
            <Poster poster='/img/drum-kit.png' link='/mini-apps/drum-kit'>
              Drum Kit
            </Poster>
            <Poster
              poster='/img/analog-clock.png'
              link='/mini-apps/analog-clock'
            >
              Analog Clock
            </Poster>
            <Poster
              poster='/img/scoped-css-var.png'
              link='/mini-apps/scoped-css-var'
            >
              Scoped CSS Variables
            </Poster>
            <Poster
              poster='/img/array-cardio.png'
              link='/mini-apps/array-cardio'
            >
              Array Cardio
            </Poster>
            <Poster
              poster='/img/flex-image-gallery.png'
              link='/mini-apps/flex-image-gallery'
            >
              Flex Image Gallery
            </Poster>
          </ol>
        </section>
      </main>
    </>
  );
};

export default Home;
