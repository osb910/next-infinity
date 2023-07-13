import styles from './FlexImageGallery.module.css';
interface FlexImageGalleryProps {}

const FlexImageGallery = ({}: FlexImageGalleryProps) => {
  return (
    <div>
      <div className={styles.panels}>
        <div className={`${styles.panel} ${styles.panel1}`}>
          <p>Hey</p>
          <p>Let&apos;s</p>
          <p>Dance</p>
        </div>
        <div className={`${styles.panel} ${styles.panel2}`}>
          <p>Give</p>
          <p>Take</p>
          <p>Receive</p>
        </div>
        <div className={`${styles.panel} ${styles.panel3}`}>
          <p>Experience</p>
          <p>It</p>
          <p>Today</p>
        </div>
        <div className={`${styles.panel} ${styles.panel4}`}>
          <p>Give</p>
          <p>All</p>
          <p>You can</p>
        </div>
        <div className={`${styles.panel} ${styles.panel5}`}>
          <p>Life</p>
          <p>In</p>
          <p>Motion</p>
        </div>
      </div>
    </div>
  );
};

export default FlexImageGallery;
