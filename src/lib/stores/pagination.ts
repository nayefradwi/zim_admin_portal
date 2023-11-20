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

const defaultPageSize = 10;
function createBatchStore<T>() {
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
    newPageNumber: number,
    apiCall: (query?: PaginationQuery | undefined) => Promise<PaginatedModel<T>>
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
    if (page) {
      console.log("page", page);
      state.page = page;
      state.pageNumber = newPageNumber;
      return set({ ...state });
    }
    return set({ ...state });
  }

  return {
    subscribe,
    set,
    refresh: async (
      state: PaginationState<T>,
      apiCall: (
        query?: PaginationQuery | undefined
      ) => Promise<PaginatedModel<T>>
    ) => {
      load(
        state.page?.previousCursor || undefined,
        undefined,
        1,
        state,
        state.pageNumber,
        apiCall
      );
    },
    getNext: (
      state: PaginationState<T>,
      apiCall: (
        query?: PaginationQuery | undefined
      ) => Promise<PaginatedModel<T>>
    ) => {
      load(
        state.page?.endCursor || undefined,
        undefined,
        1,
        state,
        state.pageNumber + 1,
        apiCall
      );
    },
    getPrevious: (
      state: PaginationState<T>,
      apiCall: (
        query?: PaginationQuery | undefined
      ) => Promise<PaginatedModel<T>>
    ) => {
      load(
        undefined,
        state.page?.previousCursor || undefined,
        1,
        state,
        state.pageNumber - 1,
        apiCall
      );
    },
    pageSize,
  };
}

export const batchStore = createBatchStore<Batch>();
