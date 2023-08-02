'use client';
import {useRef, useEffect, ReactNode, FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import useSearchFilters from '@/hooks/useSearchFilters';

interface SearchFormProps {
  children: ReactNode;
  searchPath: string;
  [idx: string]: any;
}

const SearchForm = ({children, searchPath, ...delegated}: SearchFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const {filters: savedFilters, setFilters} = useSearchFilters();
  useEffect(() => {
    const formElements = formRef.current!.elements;
    for (const [k, v] of Object.entries(savedFilters)) {
      const el = formElements.namedItem(k) as
        | HTMLSelectElement
        | HTMLInputElement
        | HTMLTextAreaElement;
      el.value = v;
    }
    // eslint-disable-next-line
  }, []);
  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = [...new FormData(evt.currentTarget).entries()];
    const filters = Object.fromEntries(formData);
    const searchParams = formData.map(([k, v]) => `${k}=${v}`).join('&');
    setFilters(filters);
    router.push(`${searchPath}?${searchParams}`);
  };
  return (
    <form onSubmit={submit} ref={formRef} {...delegated}>
      {children}
    </form>
  );
};

export default SearchForm;
