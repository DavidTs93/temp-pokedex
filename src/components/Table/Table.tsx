import React, { useState, useEffect, useRef } from 'react';
import { useGameData } from '../../contexts/GameDataContext';
import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';
import appStyles from '../../styles/App.module.css';
import { isUndefined, isNull, isObject, isFunction, isString,
  isStringOrValidNumber, isEmpty } from '../../utils/utils';
import { Pokemon, Type } from '../../types/classes';
import { TypeDisplay } from '../Details/PokemonDetails/PokemonDetails';

export interface Column<T> {
  header: string;
  accessor: ((item: T) => any) | keyof T;
  width?: string;
  sortable?: boolean;
  sortValue?: (item: T) => any;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: readonly T[];
  isWide: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T, isWide: boolean) => void;
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
  isWide,
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
  useGameData();
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
  const handleRowClick = (item: T, isWide: boolean) => {
    if (onRowClick) {
      onRowClick(item, isWide);
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
    if (isFunction(column.accessor)) {
      return (
        <div>
          {renderCellContent((column.accessor as (item: T) => any)(item))}
        </div>
      );
    } else {
      return (
        <div className={column.accessor === 'name' ? styles.tableObjectName : ''}>
          {renderCellContent(item[column.accessor as keyof T])}
        </div>
      );
    }
  };

  interface Displayable {
    toDisplay(): string;
  }
  
  function isDisplayable(obj: any): obj is Displayable {
    return isFunction(obj?.toDisplay);
  }

  function renderCellContent(value: any, index?: number): React.ReactNode {
    if (isUndefined(value) || isNull(value)) return '';
    const keyProps = isUndefined(index) ? {} : { key: index };
    if (isStringOrValidNumber(value)) {
      return <span {...keyProps}>{value}</span>;
    }

    if (Array.isArray(value)) {
      return isEmpty(value) ? '' : (
        <div className={`${appStyles.arrContainer} ${appStyles.flexColumn}`}>
          {value.map((val: any, idx: number) => renderCellContent(val, idx))}
        </div>
      );
    }

    if (value instanceof Type) return TypeDisplay(value, keyProps);
    if (value instanceof Pokemon) {
      return <div {...keyProps} className={styles.tablePokemonContainer}>
        {value.sprite && <img src={value.sprite} alt={value.name} className={styles.tablePokemonSprite} />}
        <span className={styles.tableObjectName}>{value.name}</span>
      </div>
    }

    if (isDisplayable(value)) return value.toDisplay();
    const name = (value as any)?.name;
    if (isString(name)) return renderCellContent(name);
    if (isObject(value)) return renderCellContent(JSON.stringify(value));
    return '';
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
      if (isUndefined(aValue) || isNull(aValue)) return 1;
      if (isUndefined(bValue) || isNull(bValue)) return -1;

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
        {isEmpty(data) ? (
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
                onClick={() => handleRowClick(item, isWide)}
                className={onRowClick ? appStyles.clickable : ''}
              >
                {columns.map((column, colIndex) => (
                  <td className={styles.tdContent} key={colIndex}>{renderCell(item, column)}</td>
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