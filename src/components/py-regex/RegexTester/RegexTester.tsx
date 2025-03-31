'use client';

import {useState} from 'react';
import RegexInput from '../RegexInput';
import TestStringInput from '../TestStringInput';
import useSWR from 'swr';
import {getURL} from '@/utils/path';
import cls from './RegexTester.module.css';

const fetcher = async (
  url: string,
  {method = 'findall', pattern, text, flags}: any
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      method,
      pattern,
      text,
      flags,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

const RegexTester = () => {
  const [regexPattern, setRegexPattern] = useState('');
  const [method, setMethod] = useState('findall');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState(['v']);
  const {data, error, isLoading} = useSWR(
    regexPattern && testString
      ? [
          getURL('/api/py/py-regex'),
          {method, pattern: regexPattern, text: testString, flags},
        ]
      : null,
    ([url, args]) => fetcher(url, args),
    {revalidateOnFocus: false}
  );

  let matches;

  if (method === 'findall') {
    matches = data?.data || [];
  }

  console.log({data});
  console.log({error});

  const isValidRegex = data?.isValid ?? true;

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Regex Tester</h1>

      <RegexInput
        value={regexPattern}
        onChange={setRegexPattern}
        flags={flags}
        onFlagsChange={setFlags}
        isValid={isValidRegex}
      />

      <TestStringInput
        value={testString}
        onChange={setTestString}
        matches={matches}
        isLoading={isLoading}
      />

      <div className={cls.status}>
        {isLoading ? (
          <p>Processing...</p>
        ) : error ? (
          <p className={cls.error}>Error: {error.message}</p>
        ) : !isValidRegex ? (
          <p className={cls.error}>{data?.error || 'Invalid regex pattern'}</p>
        ) : (
          <p>
            {matches.length} match{matches.length !== 1 ? 'es' : ''} found
          </p>
        )}
      </div>
    </div>
  );
};

export default RegexTester;
