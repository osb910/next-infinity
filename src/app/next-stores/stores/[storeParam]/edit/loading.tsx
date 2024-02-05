import Image from 'next/image';
import styles from '@/components/Form/Form.module.css';

const EditStoreLoading = () => {
  const features = [
    'Wifi',
    'Open Late',
    'Family Friendly',
    'Vegetarian',
    'Licensed',
  ];
  return (
    <form className={styles.form} style={{fontFamily: 'var(--fn-loading)'}}>
      <h2 className={styles.title}>Edit Store</h2>
      <p>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' defaultValue='' />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea name='description' defaultValue='' />
      </p>
      <p>
        <label htmlFor='photo'>Photo</label>
        <input
          type='file'
          id='photo'
          name='photo'
          accept='image/gif, image/png, image/jpeg'
        />
      </p>
      <Image src='/uploads/store.png' alt='store' width={200} height={200} />
      <p>
        <label htmlFor='address'>Address</label>
        <input />
      </p>
      <p>
        <label htmlFor='lng'>Address Lng</label>
        <input type='text' id='lng' name='lng' defaultValue='' required />
      </p>
      <p>
        <label htmlFor='lat'>Address Lat</label>
        <input type='text' id='lat' name='lat' defaultValue='' required />
      </p>
      <label>Tags</label>
      <ul className={styles.tags}>
        {features.map((choice, index) => (
          <li className={styles.tagChoice} key={index}>
            <input type='checkbox' value={choice} id={choice} name='tags' />
            <label htmlFor={choice}>{choice}</label>
          </li>
        ))}
      </ul>
      <button type='submit'>Save →</button>
    </form>
  );
};

export default EditStoreLoading;
