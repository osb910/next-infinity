'use client';

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
  return (
    <AutoCompleter
      endpoint='/api/next-stores/map/search?place='
      generateSuggestions={generateAddressSuggestions}
      name={name}
      {...delegated}
    />
  );
};

export default AddressAutoComplete;
