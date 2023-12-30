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

export function createSingleItemPage<T>(item: T): PaginatedModel<T> {
  return {
    pageSize: 1,
    endCursor: "",
    previousCursor: "",
    hasNext: false,
    hasPrevious: false,
    itemsLength: 1,
    items: [item],
  };
}
