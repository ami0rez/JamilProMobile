import ColumnFilter from './column-filter';

export default class PaginationRequest {
  start: number;
  length: number;
  filters?: ColumnFilter[] = [];
  genericFilters?: ColumnFilter[] = [];
  predefinedFilters?: string[] = [];
  sortField?: string;
  sortOrder?: number;
  columnTypes?: any[];
}
