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
  endCursor?: string;
  previousCursor?: string;
  pageSize?: Number;
  sort?: number;
}
