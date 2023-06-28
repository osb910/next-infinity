import styles from './page.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Built with 🥔 by{' '}
        <a href='https://github.com/osb910' target='_blank' rel='noreferrer'>
          Omar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
