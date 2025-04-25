/**
 * Filter data based on search text and active filters
 * @param data The data to filter
 * @param searchText The search text to filter by
 * @param searchFields The fields to search in
 * @param activeFilters The active filters to apply
 * @param filterConfig Configuration for how to apply filters
 * @returns Filtered data
 */
export function filterData<T>(
  data: T[],
  searchText: string,
  searchFields: (keyof T)[],
  activeFilters: Record<string, string[]> = {},
  filterConfig: Record<string, { field: string; type: 'multi' | 'single' }> = {}
): T[] {
  // First apply search filter
  let filteredData = data;

  if (searchText) {
    const searchLower = searchText.toLowerCase();
    filteredData = data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;

        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }

        if (Array.isArray(value)) {
          return value.some(v => {
            if (typeof v === 'string') {
              return v.toLowerCase().includes(searchLower);
            }
            if (typeof v === 'object' && v !== null) {
              return Object.values(v).some(val =>
                typeof val === 'string' && val.toLowerCase().includes(searchLower)
              );
            }
            return false;
          });
        }

        if (typeof value === 'object') {
          return Object.values(value).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchLower)
          );
        }

        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }

  // Then apply active filters
  if (Object.keys(activeFilters).length > 0) {
    filteredData = filteredData.filter(item => {
      return Object.entries(activeFilters).every(([filterType, filterValues]) => {
        const config = filterConfig[filterType];
        if (!config) return true; // If no config, don't filter

        const fieldValue = item[config.field as keyof T];

        if (config.type === 'multi') {
          // For multi-select filters, item should match any of the selected values
          return filterValues.some(value => {
            if (Array.isArray(fieldValue)) {
              return fieldValue.includes(value);
            }
            return fieldValue === value;
          });
        } else {
          // For single-select filters, item should match the selected value
          return filterValues.includes(String(fieldValue));
        }
      });
    });
  }

  return filteredData;
}