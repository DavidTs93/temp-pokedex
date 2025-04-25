import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SortState {
  column: string | null;
  direction: 'asc' | 'desc';
}

interface SortContextType {
  sortStates: Record<string, SortState>;
  setSortState: (page: string, state: SortState) => void;
  getSortState: (page: string) => SortState;
}

const SortContext = createContext<SortContextType | undefined>(undefined);

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
};

interface SortProviderProps {
  children: ReactNode;
}

export const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
  const [sortStates, setSortStates] = useState<Record<string, SortState>>({});

  const setSortState = (page: string, state: SortState) => {
    setSortStates(prev => ({
      ...prev,
      [page]: state
    }));
  };

  const getSortState = (page: string): SortState => {
    return sortStates[page] || { column: null, direction: 'asc' };
  };

  return (
    <SortContext.Provider value={{ sortStates, setSortState, getSortState }}>
      {children}
    </SortContext.Provider>
  );
}; 