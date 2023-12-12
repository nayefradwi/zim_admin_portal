<script lang="ts">
  import {
    ProductRepo,
    type Batch,
    type PaginatedModel,
    type ResponseHandlerData,
    getResponse,
  } from "../../../../data";
  import { batchStore, type PaginationState } from "../../../stores/pagination";
  import BatchTable from "./BatchTable.svelte";
  let search: string = "";
  let currentBatchState: PaginationState<Batch> = $batchStore;
  const clearSearch = () => {
    search = "";
    batchStore.refresh(currentBatchState);
  };

  const searchBySku = () => {
    if (search.length === 0) return clearSearch();
    const details: ResponseHandlerData<PaginatedModel<Batch>> = {
      call: () => ProductRepo.getBatchesBySku(search),
      onSuccess: (data) => {
        let newState: PaginationState<Batch> = {
          page: data,
          pageNumber: 1,
          isLoading: false,
        };
        $batchStore = newState;
      },
      onError: (error) => {
        console.log(error);
      },
    };
    return getResponse<PaginatedModel<Batch>>(details);
  };
</script>

<div class="overflow-x-auto m-4 flex flex-col">
  <div class="my-4 mx-1 flex flex-row justify-end">
    <input
      type="text"
      placeholder="Search"
      bind:value={search}
      on:keypress={(e) => {
        if (e.key === "Enter") searchBySku();
      }}
      class="input input-bordered mr-2 input-sm w-full"
    />
  </div>
  <BatchTable />
</div>
