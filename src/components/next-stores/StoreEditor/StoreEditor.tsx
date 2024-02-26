'use client';

import {useLayoutEffect, useRef, type ChangeEvent} from 'react';
import Image from 'next/image';
import {type IStore} from '@/services/next-stores/store';
import {useToaster} from '@/ui/Toaster';
import Form from '../../Form';
import Input from '@/ui/Input';
import AutoCompleter from '../../AutoCompleter';
import cls from './StoreEditor.module.css';
import {useFormState} from 'react-dom';
import {saveStore} from './actions';

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

const features = [
  'Wifi',
  'Open Late',
  'Family Friendly',
  'Vegetarian',
  'Licensed',
];

const StoreEditor = ({store}: StoreEditorProps) => {
  const [formState, formAction] = useFormState(saveStore, {
    status: 'idle',
    message: null,
    data: store ?? null,
  });
  const photoRef = useRef<HTMLImageElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const {createToast} = useToaster();

  const tags = store?.tags ?? [];

  const generateAddressSuggestions = (data: any) =>
    data.features.map(
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
        photoRef.current!.className = cls.preview;
      }
    };
  };

  useLayoutEffect(() => {
    if (formState.status === 'error' && formState.message) {
      createToast(formState.status, formState.message);
    }

    if (formState.status === 'success' && formState.message) {
      createToast(
        formState.status,
        <>
          <p>{formState.message}</p>
          <a
            className='btn'
            href={`/next-stores/stores/${formState.data?._id}`}
          >
            View Store →
          </a>
        </>,
        'infinite'
      );
      photoRef.current!.removeAttribute('class');
    }
  }, [formState, createToast]);

  return (
    <Form
      action={formAction}
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
          dir='auto'
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
        src={`/api/next-stores/files/${store?.photo?.key}`}
        alt={store?.name ?? 'store'}
        width={200}
        height={200}
        ref={photoRef}
      />
      <AutoCompleter
        endpoint='/api/next-stores/map/search?place='
        generateSuggestions={generateAddressSuggestions}
        label='Address'
        name='address'
        placeholder='Enter a location'
        required
        changeSelected={changeSelectedAddress}
        defaultValue={store?.location?.address ?? ''}
      />
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
      <ul className={cls.tags}>
        {features.map((choice, index) => (
          <li className={cls.tagChoice} key={index}>
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
