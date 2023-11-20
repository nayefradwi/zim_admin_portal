<script lang="ts">
  import { onMount } from "svelte";
  import {
    ProductRepo,
    type PaginatedModel,
    type Batch,
    type ResponseHandlerData,
  } from "../../../../data";
  import BatchTableRow from "./BatchTableRow.svelte";
  import { getNext, getPrevious } from "../../../utils/functions";
  import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";

  let isLoading = true;
  let batchPage: PaginatedModel<Batch> | null = null;
  let pageNumber = 1;
  const pageSize = 10;
  function getPaginationDetails(
    pageSize: number,
    sort: number,
    endCursor: string | undefined,
    previousCursor: string | undefined
  ): ResponseHandlerData<PaginatedModel<Batch>> {
    const details: ResponseHandlerData<PaginatedModel<Batch>> = {
      call: () => {
        isLoading = true;
        return ProductRepo.getBatches({
          pageSize,
          endCursor,
          previousCursor,
          sort,
        });
      },
      onSuccess(data) {
        isLoading = false;
        if (data.itemsLength == 0) return;
        batchPage = data;
      },
      onError(_) {
        isLoading = false;
      },
    };
    return details;
  }

  function load() {
    return getNext(pageSize, batchPage, getPaginationDetails);
  }

  function next() {
    return getNext(pageSize, batchPage, getPaginationDetails);
  }

  function previous() {
    return getPrevious(pageSize, batchPage, getPaginationDetails);
  }

  onMount(() => {
    load();
  });
</script>

<div class="flex flex-col justify-center w-full my-2">
  {#if isLoading}
    <span
      class="loading loading-spinner loading-lg bg-primary
            self-center"
    />
  {:else if !batchPage || batchPage.items.length === 0}
    <span class="text-center text-gray-500">No Batches</span>
  {:else}
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Id</th>
          <th>Sku</th>
          <th>Product</th>
          <th>Name</th>
          <th>Total Worth</th>
          <th>Quantity</th>
          <th>Expires At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each { length: pageSize } as _, i}
          <BatchTableRow batches={batchPage.items} index={i} />
        {/each}
      </tbody>
    </table>
    <dvi class="flex flex-row w-full justify-center items-center">
      <button class="btn btn-xs my-2 mx-1" on:click={previous}>
        <ArrowLeftIcon size="10" />
      </button>
      <span class="text-center text-gray-500">{pageNumber}</span>
      <button class="btn btn-xs my-2 mx-1" on:click={next}>
        <ArrowRightIcon size="10" />
      </button>
    </dvi>
  {/if}
</div>
