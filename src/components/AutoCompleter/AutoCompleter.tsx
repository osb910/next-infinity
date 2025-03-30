'use client';
import {useState, useId, ComponentProps} from 'react';
import Select from 'react-select';
import {getURL} from '@/utils/path';
import styles from './AutoCompleter.module.css';

interface AutoCompleterProps extends ComponentProps<'input'> {
  endpoint: string;
  generateSuggestions: (data: any) => any;
  defaultValue?: string;
  label?: string;
  minLength?: number;
  changeSelected?: (option: any) => void;
  [idx: string]: any;
}

const AutoCompleter = ({
  endpoint,
  generateSuggestions,
  label,
  defaultValue,
  minLength,
  changeSelected,
  ...delegated
}: AutoCompleterProps) => {
  const generatedId = useId();
  const appliedId = `${
    label ? label.toLowerCase() + generatedId : generatedId
  }`;
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState(defaultValue ?? '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const changeValue = async (newValue: string) => {
    setValue(newValue);
    if (newValue.length < (minLength ?? 3)) return;
    setLoading(true);
    try {
      const res = await fetch(getURL(`${endpoint}${value}`), {
        cache: 'no-store',
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      const newSuggestions = generateSuggestions(data);
      setSuggestions(newSuggestions);
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      setError(err.message);
      return;
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={appliedId}>{label}</label>}
      <Select
        inputId={appliedId}
        inputValue={value}
        options={suggestions}
        onInputChange={changeValue}
        onChange={changeSelected}
        menuIsOpen={suggestions.length > 0 && value.length >= (minLength ?? 3)}
        isLoading={loading}
        closeMenuOnSelect
        isClearable
        isSearchable
        {...delegated}
      />
    </div>
  );
};

export default AutoCompleter;
