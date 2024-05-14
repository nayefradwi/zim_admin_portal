<script lang="ts">
  import type { Batch, PaginatedModel } from "../../data";
  import TablePaginationButtons from "./TablePaginationButtons.svelte";
  import BatchTableRow from "../pages/home/inventory/BatchTableRow.svelte";
  export let batchPage: PaginatedModel<Batch> | null;
  export let pageNumber: number;
  export let isLoading: boolean;
  export let tableSize: number | undefined = undefined;
  export let next: () => void;
  export let prev: () => void;
  export let onSuccessfulModify: () => void;

  function getBatch(index: number): Batch | undefined {
    if (!batchPage) return;
    if (index >= batchPage.items.length) return;
    return batchPage.items[index];
  }
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
        {#each { length: tableSize ?? batchPage.pageSize } as _, i}
          <BatchTableRow item={getBatch(i)} {onSuccessfulModify} />
        {/each}
      </tbody>
    </table>
    <TablePaginationButtons {next} {prev} {pageNumber} />
  {/if}
</div>
