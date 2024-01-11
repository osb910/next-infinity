'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import AutoCompleter from '../AutoCompleter';

interface AddressAutoCompleteProps {
  name: string;
  [idx: string]: any;
}

type AddressOption = {
  id: string;
  value: string;
  label: string;
  coordinates: [number, number];
};

const AddressAutoComplete = ({
  name,
  ...delegated
}: AddressAutoCompleteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
  const changeAddress = (option: AddressOption) => {
    if (!option) return;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('lng', `${option.coordinates[0]}`);
    current.set('lat', `${option.coordinates[1]}`);
    const search = current.toString();
    router.push(`${pathname}${search ? `?${search}` : ''}`);
  };
  return (
    <AutoCompleter
      endpoint='/api/next-stores/map/search?place='
      generateSuggestions={generateAddressSuggestions}
      changeSelected={changeAddress}
      name={name}
      {...delegated}
    />
  );
};

export default AddressAutoComplete;
