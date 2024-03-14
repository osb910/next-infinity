'use client';

import {useEffect} from 'react';

const useLogger = (value: any, {stringify = false}: {stringify: boolean}) => {
  useEffect(() => {
    const logged = stringify ? JSON.stringify(value, null, 2) : value;
    console.log(logged);
  }, [value, stringify]);
};

export default useLogger;
