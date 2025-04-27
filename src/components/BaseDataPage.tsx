import React, { useState, useEffect } from 'react';
import Table from './Table/Table';
import SearchAndFilter from './SearchAndFilter/SearchAndFilter';
import Modal from './Modal/Modal';
import { filterData } from '../utils/filter';
import { paginateData } from '../utils/pagination';
import { useModal } from '../hooks/useModal';
import { useSort } from '../contexts/SortContext';

export interface Column<T> {
  header: string;
  accessor: ((item: T) => any) | keyof T;
  width?: string;
  sortable?: boolean;
  sortValue?: (item: T) => any;
}

export interface FilterOption {
  value: string;
  label: string;
}

export type EntityType = 'pokemon' | 'move' | 'ability' | 'item' | 'location';

export interface BaseDataPageProps<T> {
  title: string;
  description: string;
  data: T[];
  columns: Column<T>[];
  filterOptions?: FilterOption[];
  searchFields: (keyof T)[];
  filterConfig?: Record<string, { field: string; type: 'multi' | 'single' }>;
  itemsPerPage: number;
  entityType: EntityType;
  DetailsComponent: React.ComponentType<any>;
  searchPlaceholder?: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSessionStorage?: boolean;
  sessionStoragePrefix?: string;
  filterLabel?: string;
}

export function BaseDataPage<T extends { id: string | number; name?: string }>({
  title,
  description,
  data,
  columns,
  filterOptions = [],
  searchFields,
  filterConfig = {},
  itemsPerPage,
  entityType,
  DetailsComponent,
  searchPlaceholder = `Search ${title.toLowerCase()}...`,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableSearch = true,
  enableSessionStorage = true,
  sessionStoragePrefix = entityType,
  filterLabel = 'Filters'
}: BaseDataPageProps<T>) {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Use the SortContext to manage sort state
  const { getSortState, setSortState } = useSort();
  const { column: sortColumn, direction: sortDirection } = getSortState(entityType);

  // Restore state from sessionStorage when component mounts
  useEffect(() => {
    if (!enableSessionStorage) return;

    const savedSearchValue = sessionStorage.getItem(`${sessionStoragePrefix}SearchValue`);
    const savedActiveFilters = sessionStorage.getItem(`${sessionStoragePrefix}ActiveFilters`);

    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
    }

    if (savedActiveFilters) {
      setActiveFilters(JSON.parse(savedActiveFilters));
    }
  }, [enableSessionStorage, sessionStoragePrefix]);

  // Save state to sessionStorage when it changes
  useEffect(() => {
    if (!enableSessionStorage) return;

    sessionStorage.setItem(`${sessionStoragePrefix}SearchValue`, searchValue);
    sessionStorage.setItem(`${sessionStoragePrefix}ActiveFilters`, JSON.stringify(activeFilters));
  }, [searchValue, activeFilters, enableSessionStorage, sessionStoragePrefix]);

  // Filter data based on search and filters using utility function
  const filteredData = filterData<T>(
    data,
    searchValue,
    searchFields,
    activeFilters.reduce((acc, filter) => {
      const [type, value] = filter.split(':');
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(value);
      return acc;
    }, {} as Record<string, string[]>),
    filterConfig
  );

  // Sort the filtered data
  const sortedData = React.useMemo(() => {
    if (!sortColumn || !enableSorting) return filteredData;

    return [...filteredData].sort((a, b) => {
      // Primary sort
      const column = columns.find(col => col.header === sortColumn);
      if (!column) return 0;

      const getValue = (item: T) => {
        // Use sortValue if available, otherwise fall back to accessor
        if (column.sortValue) {
          return column.sortValue(item);
        }

        // Use a helper function to safely get the value from accessor
        const value = typeof column.accessor === 'function'
          ? (column.accessor as (item: T) => any)(item)
          : item[column.accessor as keyof T];

        if (Array.isArray(value)) return value.join(', ');
        if (typeof value === 'object') return JSON.stringify(value);
        return value ?? '';
      };

      const aValue = getValue(a) ?? '';
      const bValue = getValue(b) ?? '';

      // Compare primary values
      if (aValue !== bValue) {
        return aValue < bValue ? (sortDirection === 'asc' ? -1 : 1) : (sortDirection === 'asc' ? 1 : -1);
      }

      // Secondary sort by Name when primary values are equal
      const aName = a.name ?? '';
      const bName = b.name ?? '';
      return aName < bName ? -1 : 1;
    });
  }, [filteredData, sortColumn, sortDirection, enableSorting]);

  // Paginate data using utility function
  const { paginatedData, totalPages } = enablePagination
    ? paginateData<T>(sortedData, currentPage, itemsPerPage)
    : { paginatedData: sortedData, totalPages: 1 };

  // Handle filter add
  const handleFilterAdd = (value: string) => {
    setActiveFilters(prev => [...prev, value]);
    setCurrentPage(1);
  };

  // Handle filter remove
  const handleFilterRemove = (value: string) => {
    setActiveFilters(prev => prev.filter(filter => filter !== value));
    setCurrentPage(1);
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setActiveFilters([]);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSortState(entityType, { column, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Modal state
  const { isOpen, selectedId, openModal, closeModal } = useModal({
    entityType,
    enableDeepLinking: true
  });

  // Find the selected item
  const selectedItem = selectedId
    ? data.find((item: T) => item.id === selectedId)
    : null;

  // Handle row click
  const handleRowClick = (item: T) => {
    openModal(item.id);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>

      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        onFilterAdd={handleFilterAdd}
        onFilterRemove={handleFilterRemove}
        onClearFilters={handleClearFilters}
        searchPlaceholder={searchPlaceholder}
        enableSearch={enableSearch}
        enableFiltering={enableFiltering}
        filterLabel={filterLabel}
      />

      <Table
        columns={columns}
        data={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onRowClick={handleRowClick}
        onSort={handleSort}
        secondarySortColumn="Name"
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        emptyMessage={`No ${title.toLowerCase()} found matching your criteria`}
        enablePagination={enablePagination}
        enableSorting={enableSorting}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedItem?.name || `${title} Details`}
      >
        {selectedItem && <DetailsComponent {...{ [entityType]: selectedItem } as any} />}
      </Modal>
    </div>
  );
}
