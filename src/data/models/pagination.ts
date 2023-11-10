export interface PaginatedModel<T> {
    items: T[],
    endCursor: String,
    hasNext: Boolean,
    total: Number,
    pageSize: Number,
}
