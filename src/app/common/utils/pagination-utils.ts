import ColumnFilter from '../models/column-filter';
import { Constants } from '../models/constants';
import { lazyLoadEvent } from '../models/lazy-load-event';
import PaginationRequest from '../models/pagination-request';

/**
 *  @description Contains helpful functions for pagination
 */
export class PaginationUtils {
  /**
   *  @description Initialize pagination request
   */
  public static initializeRequest(
    pagination: PaginationRequest,
    columnTypes: any[] = null
  ) {
    if (!pagination) {
      pagination = new PaginationRequest();
    }
    pagination.start = 0;
    pagination.length = Constants.rowsNumber;
    pagination.columnTypes = columnTypes;
  }

  /**
   *  @description Updates pagination request
   */
  public static updatePaginationRequest(
    pagination: PaginationRequest,
    event: lazyLoadEvent
  ) {
    pagination.start = event.first ?? pagination.start;
    pagination.length = event.rows ?? pagination.length;
    pagination.sortField = event.sortField ?? pagination.sortField;
    pagination.sortOrder = event.sortOrder ?? pagination.sortOrder;
    if (event.filters) {
      pagination.filters = [
        ...Object.keys(event.filters).map((filter) =>
          this.generateColumnFilter(
            pagination,
            filter,
            event.filters[filter].value,
            event.filters[filter].matchMode
          )
        ),
      ];
    }
  }

  /**
   *  @description Updates pagination request for exporting with filters
   */
  private static generateColumnFilter(
    pagination: PaginationRequest,
    filter,
    value,
    matchMode,
    isListItem = false
  ) {
    const columnType = pagination.columnTypes?.find(
      (col) => col.column === filter
    )?.type;
    var generatedFilter: ColumnFilter = {
      key: filter,
      value: value,
      matchMode: matchMode,
      columnType: columnType,
      listItem: isListItem,
    };
    return generatedFilter;
  }

  /**
   *  @description Updates pagination request for exporting with filters
   */
  public static updateRequestForExport(pagination: PaginationRequest) {
    pagination.start = undefined;
    pagination.length = undefined;
  }

  /**
   *  @description Clears the pagination request for exporting with no filters
   */
  public static updateRequestForExportAll(pagination: PaginationRequest) {
    pagination.start = undefined;
    pagination.length = undefined;
    pagination.genericFilters = [];
    pagination.predefinedFilters = [];
    pagination.filters = [];
  }

  /**
   *  @description set pagination input params from source params
   */
  public static setPagination(
    pagination: PaginationRequest,
    source: PaginationRequest
  ) {
    pagination.start = source.start;
    pagination.length = source.length;
    pagination.genericFilters = source.genericFilters;
    pagination.predefinedFilters = source.predefinedFilters;
    pagination.filters = source.filters;
    pagination.sortField = source.sortField;
    pagination.sortOrder = source.sortOrder;
  }

  /**
   *  @description Clone the passed pagination request
   */
  public static cloneRequest(pagination: PaginationRequest): PaginationRequest {
    const clonedQuery: PaginationRequest = {
      start: pagination.start,
      length: pagination.length,
      predefinedFilters: [...pagination.predefinedFilters],
      genericFilters: [...pagination.genericFilters],
      filters: [...pagination.filters],
      sortField: pagination.sortField,
      sortOrder: pagination.sortOrder,
      columnTypes: pagination.columnTypes,
    };
    return clonedQuery;
  }
}
