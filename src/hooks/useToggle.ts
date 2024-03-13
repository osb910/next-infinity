'use client';

import {useState} from 'react';

type Toggle = [value: boolean, toggleValue: (bool?: boolean) => void];

const useToggle = (initialValue?: boolean): Toggle => {
  const [value, setValue] = useState<boolean>(!!initialValue);

  const toggleValue = (newValue?: boolean) => {
    setValue(current => newValue ?? !current);
  };

  return [value, toggleValue];
};

export default useToggle;
