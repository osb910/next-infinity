import styles from './Search.module.css';
interface SearchProps {}

const Search = ({}: SearchProps) => {
  return (
    <div className={styles.search}>
      <input
        type='text'
        className={styles.searchInput}
        placeholder='Coffee, tea, sandwiches...'
        name='search'
      />
      <div className={styles.searchResults}></div>
    </div>
  );
};

export default Search;
