import styles from './page.module.css';
import Poster from '@/components/Poster/Poster';
import SiteLogo from '@/components/SiteLogo/SiteLogo';
import {getFolderNames, readFolder} from '@/utils/file';

const Home = async () => {
  const packages = await import('../../package.json');
  const nextVersion = packages.dependencies.next.replace('^', '');
  const appFolder = await getFolderNames('./app');
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
            <Poster poster='/img/next-events.png' link='/next-events'>
              Next Events
            </Poster>
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
