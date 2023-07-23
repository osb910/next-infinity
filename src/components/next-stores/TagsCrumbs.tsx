import Link from 'next/link';
import styles from './Tags.module.css';

interface TagsCrumbsProps {
  tags: {
    _id: string;
    count: number;
  }[];
  active: string;
}

const TagsCrumbs = ({tags, active}: TagsCrumbsProps) => {
  return (
    <ul className={styles.tags}>
      {tags.map(({_id, count}, index) => (
        <li className={styles.tag} key={index}>
          <Link
            className={`${styles.tagLink} ${
              _id === active ? styles.tagLinkActive : ''
            }`}
            href={`/next-stores/tags?tag=${_id}`}
          >
            <span className={styles.tagText}>#{_id}</span>
            <span className={styles.tagCount}>#{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagsCrumbs;
