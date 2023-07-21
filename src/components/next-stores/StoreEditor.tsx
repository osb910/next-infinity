'use client';

import {useState, useRef, FormEvent, ChangeEvent} from 'react';
import Image from 'next/image';
import ky from 'ky';
import Link from 'next/link';
import Select from 'react-select';
import {IStore} from '@/entities/next-stores/store/store.model';
import {getURL} from '@/utils/path';
import styles from './StoreEditor.module.css';
import Spinner from '../Spinner';
import useToaster from '../Toaster/use-toaster';

interface StoreEditorProps {
  store?: IStore;
}

type AddressOption = {
  id: string;
  value: string;
  label: string;
  coordinates: [number, number];
};

const StoreEditor = ({store}: StoreEditorProps) => {
  const features = [
    'Wifi',
    'Open Late',
    'Family Friendly',
    'Vegetarian',
    'Licensed',
  ];
  const tags = store?.tags ?? [];

  const [address, setAddress] = useState(store?.location?.address ?? '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const photoRef = useRef<HTMLImageElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const {createToast} = useToaster();

  const changeAddress = async (newValue: string) => {
    setAddress(newValue);
    if (newValue.length < 3) return;
    setAddressLoading(true);
    try {
      const res = await fetch(getURL(`/api/next-stores/map?place=${address}`));
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      const newSuggestions = data.features.map(
        ({
          id,
          properties: {name, place_formatted},
          geometry,
        }: any): AddressOption => ({
          id,
          value: `${name}${place_formatted ? `, ${place_formatted}` : ''}`,
          label: `${name}${place_formatted ? `, ${place_formatted}` : ''}`,
          coordinates: geometry.coordinates,
        })
      );
      setSuggestions(newSuggestions);
    } catch (err) {
      if (!(err instanceof Error)) return;
      setError(err.message);
      return;
    }
    setAddressLoading(false);
  };

  const changeSelectedAddress = (option: AddressOption) => {
    if (!option) return;
    lngRef.current!.value = `${option.coordinates[0]}`;
    latRef.current!.value = `${option.coordinates[1]}`;
  };

  const previewPhoto = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (photoRef.current) {
        photoRef.current!.removeAttribute('srcset');
        photoRef.current!.src = reader.result as string;
        photoRef.current!.className = styles.preview;
      }
    };
  };

  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      const method = store ? 'put' : 'post';
      const res = await ky[method](
        getURL(`/api/next-stores/store${store ? `/${store._id}` : ''}`),
        {
          body: new FormData(evt.currentTarget),
          timeout: false,
        }
      );
      const json = (await res.json()) as IStore & {
        status: 'success' | 'warning' | 'error' | 'notice';
        message: string;
      };
      createToast(
        json.status,
        <>
          <p>{json.message}</p>
          <Link className='btn' href={`/next-stores/stores/${json._id}`}>
            View Store →
          </Link>
        </>,
        30000
      );
      photoRef.current!.removeAttribute('class');
      evt.currentTarget.reset();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <p>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' defaultValue={store?.name ?? ''} />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea name='description' defaultValue={store?.description ?? ''} />
      </p>
      <p>
        <label htmlFor='photo'>Photo</label>
        <input
          type='file'
          id='photo'
          name='photo'
          accept='image/gif, image/png, image/jpeg, document/docx'
          onChange={previewPhoto}
        />
      </p>
      <Image
        src={`/api/next-stores/files/${store?.photo?.key ?? 'store.png'}`}
        alt={store?.name ?? 'store'}
        width={200}
        height={200}
        ref={photoRef}
      />
      <div>
        <label htmlFor='address'>Address</label>
        <Select
          inputId='address'
          name='address'
          placeholder='Enter a location'
          required
          inputValue={address}
          options={suggestions}
          onInputChange={changeAddress}
          // @ts-ignore
          onChange={changeSelectedAddress}
          menuIsOpen={suggestions.length > 0 && address.length > 2}
          isLoading={addressLoading}
          closeMenuOnSelect
          isClearable
          isSearchable
        />
      </div>
      <p>
        <label htmlFor='lng'>Address Lng</label>
        <input
          type='text'
          id='lng'
          name='lng'
          defaultValue={store?.location?.coordinates?.[0] ?? ''}
          required
          ref={lngRef}
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
          ref={latRef}
        />
      </p>
      <ul className={styles.tags}>
        {features.map((choice, index) => (
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
      <button disabled={submitting} type='submit' className={styles.button}>
        {submitting ? <Spinner /> : 'Save →'}
      </button>
    </form>
  );
};

export default StoreEditor;
