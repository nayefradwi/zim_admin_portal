import { writable } from "svelte/store";
import {
  ProductRepo,
  type Batch,
  type PaginatedModel,
  type PaginationQuery,
  type Product,
} from "../../data";
import { getPage } from "../utils/functions";
const FORWARD_DIRECTION = 1;
const REFRESH_DIRECTION = 0;
const BACKWARD_DIRECTION = -1;

export interface PaginationState<T> {
  isLoading: boolean;
  page: PaginatedModel<T> | null;
  pageNumber: number;
}

const defaultPageSize = 10;
function createPaginationStore<T>(
  apiCall: (query?: PaginationQuery | undefined) => Promise<PaginatedModel<T>>
) {
  const store = writable<PaginationState<T>>({
    isLoading: false,
    page: null,
    pageNumber: 1,
  });
  const { subscribe, set } = store;
  const pageSize = defaultPageSize;

  async function load(
    cursor: string | undefined,
    direction: number,
    state: PaginationState<T>,
    newPageNumber: number
  ) {
    state.isLoading = true;
    set(state);
    const page: PaginatedModel<T> = await getPage<T>(
      defaultPageSize,
      cursor,
      direction,
      apiCall
    );
    // console.log(page);
    state.isLoading = false;
    if (page && page.items.length > 0) {
      state.page = page;
      state.pageNumber = newPageNumber;
      return set(state);
    }
    return set(state);
  }

  return {
    subscribe,
    set,
    getFirstPage: async (state: PaginationState<T>) => {
      load(undefined, FORWARD_DIRECTION, state, 1);
    },
    refresh: async (state: PaginationState<T>) => {
      load(
        state.page?.previousCursor || undefined,
        REFRESH_DIRECTION,
        state,
        state.pageNumber
      );
    },
    getNext: (state: PaginationState<T>) => {
      load(
        state.page?.endCursor || undefined,
        FORWARD_DIRECTION,
        state,
        state.pageNumber + 1
      );
    },
    getPrevious: (state: PaginationState<T>) => {
      load(
        state.page?.previousCursor || undefined,
        BACKWARD_DIRECTION,
        state,
        state.pageNumber - 1
      );
    },
    pageSize,
  };
}

export const batchStore = createPaginationStore<Batch>(ProductRepo.getBatches);

export const productStore = createPaginationStore<Product>(
  ProductRepo.getProducts
);

export const ingredientStore = createPaginationStore<Product>(
  ProductRepo.getProducts
);
