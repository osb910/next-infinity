import styles from './TagsList.module.css';

interface TagsProps {
  tags: string[];
}

const TagsList = ({tags}: TagsProps) => {
  return (
    <ul className={styles.tags}>
      {tags.map((tag, index) => (
        <li className={styles.tag} key={index}>
          <a className={styles.tagLink} href={`/next-stores/tags/${tag}`}>
            <span className={styles.tagText}>#{tag}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
