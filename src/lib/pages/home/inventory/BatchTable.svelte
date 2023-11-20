<script lang="ts">
  import { ProductRepo, type Batch } from "../../../../data";
  import { batchStore, type PaginationState } from "../../../stores/pagination";
  import BatchTableRow from "./BatchTableRow.svelte";
  import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";

  function next() {
    batchStore.getNext($batchStore, ProductRepo.getBatches);
  }

  function prev() {
    batchStore.getPrevious($batchStore, ProductRepo.getBatches);
  }

  function refresh() {
    batchStore.refresh($batchStore, ProductRepo.getBatches);
  }
</script>

<div class="flex flex-col justify-center w-full my-2">
  {#if $batchStore.isLoading}
    <span
      class="loading loading-spinner loading-lg bg-primary
            self-center"
    />
  {:else if !$batchStore.page || $batchStore.page.items.length === 0}
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
        {#each { length: batchStore.pageSize } as _, i}
          <BatchTableRow batches={$batchStore.page.items} index={i} />
        {/each}
      </tbody>
    </table>
    <dvi class="flex flex-row w-full justify-center items-center">
      <button class="btn btn-xs my-2 mx-1" on:click={prev}>
        <ArrowLeftIcon size="10" />
      </button>
      <span class="text-center text-gray-500">{$batchStore.pageNumber}</span>
      <button class="btn btn-xs my-2 mx-1" on:click={next}>
        <ArrowRightIcon size="10" />
      </button>
    </dvi>
  {/if}
</div>
