export interface PaginatedModel<T> {
  pageSize: Number;
  endCursor: string;
  previousCursor: string;
  hasNext: Boolean;
  hasPrevious: Boolean;
  itemsLength: Number;
  items: T[];
}

export interface PaginationQuery {
  cursor?: string;
  pageSize?: Number;
  direction?: number;
}
