'use client';

import {FormEvent} from 'react';
import {IStore} from '@/entities/next-stores/store/store.model';
import ky from 'ky';
import {getURL} from '@/utils/path';
import Image from 'next/image';
import styles from './StoreEditor.module.css';

interface StoreEditorProps {
  store?: IStore;
}

const StoreEditor = ({store}: StoreEditorProps) => {
  const choices = [
    'Wifi',
    'Open Late',
    'Family Friendly',
    'Vegetarian',
    'Licensed',
  ];
  const tags = store?.tags ?? [];

  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const res = await ky.post(
        getURL(`/api/next-stores/store${store ? `/${store._id}` : ''}`),
        {
          body: new FormData(evt.currentTarget),
        }
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <pre>{JSON.stringify(store, null, 2)}</pre>
      <p>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' defaultValue={store?.name ?? ''} />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea name='description' defaultValue={store?.description ?? ''} />
      </p>
      {/* Image Upload */}
      <p>
        <label htmlFor='photo'>Photo</label>
        <input
          type='file'
          id='photo'
          name='photo'
          accept='image/gif, image/png, image/jpeg, document/docx'
        />
      </p>
      {store?.photo && (
        <Image src={`/uploads/${store.photo}`} alt={store?.name} width={200} />
      )}
      <p>
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          id='address'
          name='address'
          defaultValue={store?.location?.address ?? ''}
        />
      </p>
      <p>
        <label htmlFor='lng'>Address Lng</label>
        <input
          type='text'
          id='lng'
          name='lng'
          defaultValue={store?.location?.coordinates?.[0] ?? ''}
          required
        />
      </p>
      <p>
        <label htmlFor='lat'>Address Lat</label>
        <input
          type='text'
          id='lat'
          name='lat'
          defaultValue={store?.location?.coordinates?.[1] ?? ''}
          required
        />
      </p>
      <ul className={styles.tags}>
        {choices.map((choice, index) => (
          <li className={styles.tagChoice} key={index}>
            <input
              type='checkbox'
              value={choice}
              id={choice}
              name='tags'
              defaultChecked={tags.includes(choice)}
            />
            <label htmlFor={choice}>{choice}</label>
          </li>
        ))}
      </ul>
      <input type='submit' value='Save →' className={styles.button} />
    </form>
  );
};

export default StoreEditor;
