import {useState, useCallback} from 'react';

type Toggle = [
  value: boolean,
  toggleValue: Function,
  setOn: Function,
  setOff: Function
];

const useToggle = (initialValue?: boolean): Toggle => {
  const [value, setValue] = useState<boolean>(!!initialValue);

  const toggleValue = useCallback(() => {
    setValue(currentValue => !currentValue);
  }, []);

  const setOn = useCallback(() => {
    setValue(true);
  }, []);

  const setOff = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggleValue, setOn, setOff];
};

export default useToggle;
