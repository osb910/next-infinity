'use client';

import {createContext, type ReactNode, useContext} from 'react';
import {useStoredState} from '@/hooks/useStoredState';

type Filters = {
  [key: string]: unknown;
};

interface FiltersContextProps {
  filters: Filters | undefined;
  setFilters: (filters: Filters) => void;
  setFilter: (name: string, value: string) => void;
  removeFilter: (name: string) => void;
  clearFilters: () => void;
}

const SearchFiltersContext = createContext<FiltersContextProps>({
  filters: {},
  setFilters: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  clearFilters: () => {},
});

export const SearchFiltersProvider = ({children}: {children: ReactNode}) => {
  const [filters, setFilters] = useStoredState<Filters>(
    {},
    {key: 'searchFilters'}
  );

  const setFilter = (name: string, value: unknown) => {
    setFilters((current) => ({...current, [name]: value}));
  };

  const removeFilter = (name: string) => {
    setFilters((current) => {
      const next = {...current};
      delete next[name];
      return next;
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <SearchFiltersContext.Provider
      value={{filters, setFilters, setFilter, removeFilter, clearFilters}}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
};

const useSearchFilters = () => {
  const data = useContext(SearchFiltersContext);

  if (!data)
    throw new Error(
      'Cannot consume SearchFilters context without a SearchFiltersProvider'
    );

  return data;
};

export default useSearchFilters;
