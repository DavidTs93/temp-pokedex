/**
 * Paginate a list of items based on page number and items per page
 * @param data Array of items to paginate
 * @param currentPage Current page number (1-based)
 * @param itemsPerPage Number of items per page
 * @returns Object containing paginated data and pagination info
 */
export function paginateData<T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): {
  paginatedData: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
} {
  // Ensure current page is at least 1
  const page = Math.max(1, currentPage);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  // Calculate start and end indices
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  // Get paginated data
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    paginatedData,
    totalPages,
    startIndex,
    endIndex
  };
}