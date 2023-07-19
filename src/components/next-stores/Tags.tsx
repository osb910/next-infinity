import styles from './Tags.module.css';

interface TagsProps {
  tags: string[];
}

const Tags = ({tags}: TagsProps) => {
  return (
    <ul className={styles.tags}>
      {tags.map((tag, index) => (
        <li className={styles.tag} key={index}>
          <a className={styles.tagLink} href={`/tags/${tag}`}>
            <span className={styles.tagText}>#{tag}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
