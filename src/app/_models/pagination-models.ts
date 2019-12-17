export interface IPagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: IPagination;
}

export class GridFilter {
  constructor() {
    this.pageSize = 5;
    this.pageNumber = 1;
  }

  pageSize: number;
  pageNumber: number;
  setPageNumber(pageNumber: number): GridFilter {
    this.pageNumber = pageNumber;
    return this;
  }
}
