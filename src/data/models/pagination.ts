export interface PaginatedModel<T> {
  pageSize: number;
  endCursor: string;
  previousCursor: string;
  hasNext: Boolean;
  hasPrevious: Boolean;
  itemsLength: number;
  items: T[];
}

export interface PaginationQuery {
  cursor?: string;
  pageSize?: number;
  direction?: number;
}
