import { writable } from "svelte/store";
import {
  ProductRepo,
  type Batch,
  type PaginatedModel,
  type PaginationQuery,
} from "../../data";
import { getPage } from "../utils/functions";

export interface PaginationState<T> {
  isLoading: boolean;
  page: PaginatedModel<T> | null;
  pageNumber: number;
}

const defaultPageSize = 1;
function createBatchStore<T>(
  apiCall: (query?: PaginationQuery | undefined) => Promise<PaginatedModel<T>>
) {
  const store = writable<PaginationState<T>>({
    isLoading: false,
    page: null,
    pageNumber: 1,
  });
  const { subscribe, set } = store;
  const pageSize = 10;

  async function load(
    endCursor: string | undefined,
    previousCursor: string | undefined,
    sort: number,
    state: PaginationState<T>,
    newPageNumber: number
  ) {
    state.isLoading = true;
    set(state);
    const page: PaginatedModel<T> = await getPage<T>(
      defaultPageSize,
      endCursor,
      previousCursor,
      sort,
      apiCall
    );
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
    refresh: async (state: PaginationState<T>) => {
      load(
        state.page?.previousCursor || undefined,
        state.page?.endCursor || undefined,
        1,
        state,
        state.pageNumber
      );
    },
    getNext: (state: PaginationState<T>) => {
      load(
        state.page?.endCursor || undefined,
        state.page?.previousCursor || undefined,
        1,
        state,
        state.pageNumber + 1
      );
    },
    getPrevious: (state: PaginationState<T>) => {
      load(
        state.page?.endCursor || undefined,
        state.page?.previousCursor || undefined,
        -1,
        state,
        state.pageNumber - 1
      );
    },
    pageSize,
  };
}

export const batchStore = createBatchStore<Batch>(ProductRepo.getBatches);
