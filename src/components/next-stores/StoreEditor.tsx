'use client';

import {useState, useRef, ChangeEvent} from 'react';
import Image from 'next/image';
import ky from 'ky';
import Link from 'next/link';
import Select from 'react-select';
import {IStore} from '@/entities/next-stores/store/store.model';
import {getURL} from '@/utils/path';
import styles from './StoreEditor.module.css';
import useToaster from '../Toaster/use-toaster';
import Form from '../Form/Form';
import Input from '../Input';

interface StoreEditorProps {
  store?: IStore;
  isPlaceholder?: boolean;
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

  const [address, setAddress] = useState(store?.location?.address ?? '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const photoRef = useRef<HTMLImageElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const {createToast} = useToaster();

  const tags = store?.tags ?? [];

  const changeAddress = async (newValue: string) => {
    setAddress(newValue);
    if (newValue.length < 3) return;
    setAddressLoading(true);
    try {
      const res = await fetch(
        getURL(`/api/next-stores/map/search?place=${address}`),
        {
          cache: 'no-store',
        }
      );
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

  const submit = async (body: FormData) => {
    const method = store ? 'put' : 'post';
    const res = await ky[method](
      getURL(`/api/next-stores/stores${store ? `/${store._id}` : ''}`),
      {
        body,
        timeout: 20000,
        throwHttpErrors: false,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const json = (await res.json()) as {
      data: IStore;
      status: 'success' | 'warning' | 'error' | 'notice';
      message: string;
    };
    console.log(json);
    createToast(
      json.status,
      <>
        <p>{json.message}</p>
        <Link className='btn' href={`/next-stores/stores/${json.data._id}`}>
          View Store →
        </Link>
      </>,
      30000
    );
    photoRef.current!.removeAttribute('class');
  };

  return (
    <Form
      submitHandler={submit}
      submitText='Save →'
      title={store ? `Edit ${store.name}` : 'Add Store'}
    >
      <Input
        name='name'
        label='Name'
        placeholder='Store name'
        defaultValue={store?.name ?? ''}
        required
      />
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          placeholder='How does it feel like?'
          defaultValue={store?.description ?? ''}
        />
      </p>
      <Input
        type='file'
        name='photo'
        label='Photo'
        accept='image/gif, image/png, image/jpeg'
        onChange={previewPhoto}
      />
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
        <label htmlFor='lng'>Address Longitude</label>
        <input
          name='lng'
          id='lng'
          required
          placeholder='Longitude'
          defaultValue={store?.location?.coordinates?.[0] ?? ''}
          ref={lngRef}
        />
      </p>
      <p>
        <label htmlFor='lat'>Address Latitude</label>
        <input
          name='lat'
          id='lat'
          required
          placeholder='Latitude'
          defaultValue={store?.location?.coordinates?.[1] ?? ''}
          ref={latRef}
        />
      </p>
      <label>Tags</label>
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
    </Form>
  );
};

export default StoreEditor;
