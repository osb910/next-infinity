'use client';

import {useState} from 'react';

const useAutoComplete = () => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    // const value = evt.target.dataset.value;
    // setValue(value);
    // if (value.length < 3) {
    //   setShowSuggestions(false);
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const res = await fetch();
    //   const data = await res.json();
    //   console.log(data);
    //   if (data.error) {
    //     setError(data.error);
    //     return;
    //   }
    //   setShowSuggestions(true);
    // } catch (err) {
    //   if (!(err instanceof Error)) return;
    //   setError(err.message);
    //   return;
    // }
    // setLoading(false);
  };

  return {
    value,
    suggestions,
    loading,
    error,
    showSuggestions,
    onChange,
  };
};

export default useAutoComplete;
