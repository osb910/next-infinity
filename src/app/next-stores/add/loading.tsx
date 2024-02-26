import Image from 'next/image';
import cls from '@/ui/Form/Form.module.css';

const AddStoreLoading = () => {
  const features = [
    'Wifi',
    'Open Late',
    'Family Friendly',
    'Vegetarian',
    'Licensed',
  ];
  return (
    <form className={cls.form}>
      <h2 className={cls.title}>Add Store</h2>
      <p>
        <label htmlFor='name'>Name</label>
        <input
          className={cls.loading}
          type='text'
          name='name'
          defaultValue=''
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea className={cls.loading} name='description' defaultValue='' />
      </p>
      <p>
        <label htmlFor='photo'>Photo</label>
        <input
          className={cls.loading}
          type='file'
          id='photo'
          name='photo'
          accept='image/gif, image/png, image/jpeg'
        />
      </p>
      <Image src='/uploads/store.png' alt='store' width={200} height={200} />
      <p>
        <label htmlFor='address'>Address</label>
        <input className={cls.loading} />
      </p>
      <p>
        <label htmlFor='lng'>Address Lng</label>
        <input
          className={cls.loading}
          type='text'
          id='lng'
          name='lng'
          defaultValue=''
          required
        />
      </p>
      <p>
        <label htmlFor='lat'>Address Lat</label>
        <input
          className={cls.loading}
          type='text'
          id='lat'
          name='lat'
          defaultValue=''
          required
        />
      </p>
      <label>Tags</label>
      <ul className={cls.tags}>
        {features.map((choice, index) => (
          <li className={cls.tagChoice} key={index}>
            <input type='checkbox' value={choice} id={choice} name='tags' />
            <label htmlFor={choice}>{choice}</label>
          </li>
        ))}
      </ul>
      <button type='submit'>Save →</button>
    </form>
  );
};

export default AddStoreLoading;
