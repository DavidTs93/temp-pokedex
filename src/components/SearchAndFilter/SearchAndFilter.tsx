import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchAndFilter.module.css';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions: FilterOption[];
  activeFilters: string[];
  onFilterAdd: (value: string) => void;
  onFilterRemove: (value: string) => void;
  onClearFilters: () => void;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enableFiltering?: boolean;
  filterLabel: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchValue,
  onSearchChange,
  filterOptions,
  activeFilters,
  onFilterAdd,
  onFilterRemove,
  onClearFilters,
  searchPlaceholder = 'Search...',
  enableSearch = true,
  enableFiltering = true,
  filterLabel
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsFilterOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterToggle = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterRemove(filter);
    } else {
      onFilterAdd(filter);
    }
  };

  return (
    <div className={styles.searchFilterContainer}>
      {enableSearch && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchValue && (
            <button
              className={styles.clearSearch}
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      )}

      {enableFiltering && filterOptions.length > 0 && (
        <div className={styles.filterContainer} ref={filterRef}>
          <button
            className={`${styles.filterButton} ${isFilterOpen ? styles.active : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {filterLabel} {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          {isFilterOpen && (
            <div className={styles.filterDropdown}>
              {filterOptions.map((option) => {
                const isActive = activeFilters.includes(option.value);
                return (
                  <label key={option.value} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleFilterToggle(option.value)}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          )}
          {activeFilters.length > 0 && (
            <button className={styles.clearFilters} onClick={onClearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;