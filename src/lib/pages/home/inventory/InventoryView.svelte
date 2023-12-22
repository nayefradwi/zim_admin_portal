<script lang="ts">
  import { SearchIcon, XIcon } from "svelte-feather-icons";
  import {
    ProductRepo,
    type Batch,
    type PaginatedModel,
    type ResponseHandlerData,
    getResponse,
  } from "../../../../data";
  import { batchStore, type PaginationState } from "../../../stores/pagination";
  import BatchTable from "../../../components/BatchTable.svelte";
  let search: string = "";
  let currentBatchState: PaginationState<Batch> = $batchStore;
  const clearSearch = () => {
    search = "";
    batchStore.refresh(currentBatchState);
  };

  const searchBySku = () => {
    let searchVal = search.trim();
    if (searchVal === "") return clearSearch();
    $batchStore = {
      page: currentBatchState.page,
      pageNumber: 1,
      isLoading: true,
    };
    const details: ResponseHandlerData<PaginatedModel<Batch>> = {
      call: () => ProductRepo.getBatchesBySku(searchVal),
      onSuccess: (data) => {
        console.log(search, data);
        let newState: PaginationState<Batch> = {
          page: data,
          pageNumber: 1,
          isLoading: false,
        };
        $batchStore = newState;
      },
    };
    return getResponse<PaginatedModel<Batch>>(details);
  };

  function next() {
    batchStore.getNext($batchStore);
  }

  function prev() {
    batchStore.getPrevious($batchStore);
  }
</script>

<div class="overflow-x-auto m-4 flex flex-col">
  <div class="my-4 mx-1 flex flex-row justify-end items-center">
    <input
      type="text"
      placeholder="Search"
      bind:value={search}
      on:keypress={(e) => {
        if (e.key === "Enter") searchBySku();
      }}
      class="input input-bordered mr-2 input-sm w-full"
    />
    <button on:click={searchBySku}>
      <SearchIcon />
    </button>
    <span class="mx-1"></span>
    <button on:click={clearSearch}>
      <XIcon class="text-error" />
    </button>
  </div>
  <BatchTable
    {next}
    {prev}
    batchPage={$batchStore.page}
    isLoading={$batchStore.isLoading}
    pageNumber={$batchStore.pageNumber}
  />
</div>
