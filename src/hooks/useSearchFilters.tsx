'use client';

import {createContext, type ReactNode, useContext} from 'react';
import {useStoredImmer} from '@/hooks/useStoredState';

type Filters = {
  [key: string]: any;
};

interface FiltersContextProps {
  filters: Filters;
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
  const [filters, setFilters] = useStoredImmer<Filters>(
    {},
    {key: 'searchFilters'}
  );

  const setFilter = (name: string, value: any) => {
    setFilters((draft): any => {
      draft[name] = value;
    });
  };

  const removeFilter = (name: string) => {
    setFilters((draft): any => {
      delete draft[name];
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
