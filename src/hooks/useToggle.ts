'use client';

import {useState} from 'react';

type Toggle = [value: boolean, toggleValue: (bool?: boolean) => void];

const useToggle = (initialValue?: boolean): Toggle => {
  const [value, setValue] = useState<boolean>(!!initialValue);

  const toggleValue = (bool?: boolean) => {
    setValue(current => (typeof bool === 'boolean' ? bool : !current));
  };

  return [value, toggleValue];
};

export default useToggle;
