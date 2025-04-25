import React, { useState, useEffect, useRef } from 'react';
import { useGameData } from '../../contexts/GameDataContext';
import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';
import typeStyles from './Types.module.css';

export interface Column<T> {
  header: string;
  accessor: ((item: T) => any) | keyof T;
  width?: string;
  sortable?: boolean;
  sortValue?: (item: T) => any;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  secondarySortColumn?: string;
  sortColumn?: string | null;
  sortDirection?: 'asc' | 'desc';
  emptyMessage?: string;
  enablePagination?: boolean;
  enableSorting?: boolean;
  itemsPerPage?: number;
}

export function Table<T>({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick,
  onSort,
  secondarySortColumn,
  sortColumn,
  sortDirection = 'asc',
  emptyMessage = 'No data available',
  enablePagination = true,
  enableSorting = true,
  itemsPerPage = 10
}: TableProps<T>) {
  const { gameData } = useGameData();
  const navigate = useNavigate();
  const [internalSortColumn, setInternalSortColumn] = useState<string | null>(null);
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>('asc');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Handle scroll down
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use internal or external sorting state
  const activeSortColumn = sortColumn ?? internalSortColumn;
  const activeSortDirection = sortDirection ?? internalSortDirection;

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Handle row click
  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  // Handle sort
  const handleSort = (column: string) => {
    if (!enableSorting) return;

    // Determine the new sort direction
    let newDirection: 'asc' | 'desc' = 'asc';

    if (activeSortColumn === column) {
      // If already sorting by this column, toggle direction
      newDirection = activeSortDirection === 'asc' ? 'desc' : 'asc';
    }

    // Update internal state if no external sorting is provided
    if (!sortColumn) {
      setInternalSortColumn(column);
      setInternalSortDirection(newDirection);
    }

    // Call external sort handler if provided
    if (onSort) {
      onSort(column, newDirection);
    }
  };

  // Render cell content
  const renderCell = (item: T, column: Column<T>) => {
    const value = typeof column.accessor === 'function'
      ? (column.accessor as (item: T) => any)(item)
      : item[column.accessor as keyof T];

    // Special handling for types
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'name' in value[0]) {
      return (
        <div className={typeStyles.typeContainer}>
          {value.map((type: any, index: number) => (
            <span key={index} className={`${typeStyles.typeBadge} ${typeStyles[type.name.toLowerCase()]}`}>
              {type.name}
            </span>
          ))}
        </div>
      );
    }

    // Default rendering
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }

    return value ?? '';
  };

  // Render sort indicator
  const renderSortIndicator = (column: Column<T>) => {
    if (!enableSorting || !column.sortable) return null;

    if (activeSortColumn === column.header) {
      return activeSortDirection === 'asc' ? ' ↑' : ' ↓';
    }

    return null;
  };

  const sortedData = React.useMemo(() => {
    const sortCol = onSort ? sortColumn : internalSortColumn;
    const sortDir = onSort ? sortDirection : internalSortDirection;

    if (!sortCol) return data;

    return [...data].sort((a, b) => {
      const column = columns.find(col => col.header === sortCol);
      if (!column) return 0;

      let aValue: any;
      let bValue: any;

      if (typeof column.accessor === 'function') {
        aValue = column.accessor(a);
        bValue = column.accessor(b);
      } else {
        aValue = a[column.accessor];
        bValue = b[column.accessor];
      }

      if (column.sortValue) {
        aValue = column.sortValue(a);
        bValue = column.sortValue(b);
      }

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDir === 'asc' ? comparison : -comparison;
    });
  }, [data, columns, sortColumn, sortDirection, internalSortColumn, internalSortDirection, onSort]);

  const paginatedData = React.useMemo(() => {
    if (!onPageChange) return sortedData;
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, onPageChange]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width }}
                className={column.sortable ? styles.sortable : ''}
                onClick={() => column.sortable && handleSort(column.header)}
              >
                <div className={styles.thContent}>
                  {column.header}{renderSortIndicator(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody className={styles.emptyTableBody}>
            <tr>
              <td colSpan={columns.length}>
                <div className={styles.emptyMessage}>
                  {emptyMessage}
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => handleRowClick(item)}
                className={onRowClick ? styles.clickable : ''}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{renderCell(item, column)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {enablePagination && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <span className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;