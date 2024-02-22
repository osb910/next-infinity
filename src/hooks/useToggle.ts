import {useState, useCallback} from 'react';

type Toggle = [value: boolean, toggleValue: (bool?: boolean) => void];

const useToggle = (initialValue?: boolean): Toggle => {
  const [value, setValue] = useState<boolean>(!!initialValue);

  const toggleValue = useCallback((newValue?: boolean) => {
    setValue(current => newValue ?? !current);
  }, []);

  return [value, toggleValue];
};

export default useToggle;
