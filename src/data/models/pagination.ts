export interface PaginatedModel<T> {
    items: T[],
    endCursor: string,
    hasNext: Boolean,
    total: Number,
    pageSize: Number,
}


export interface PaginationQuery {
    endCursor?: string,
    pageSize?: Number,
}
