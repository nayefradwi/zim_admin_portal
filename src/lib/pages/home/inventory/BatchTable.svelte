<script lang="ts">
  import TablePaginationButtons from "../../../components/TablePaginationButtons.svelte";
  import { batchStore } from "../../../stores/pagination";
  import BatchTableRow from "./BatchTableRow.svelte";

  function next() {
    batchStore.getNext($batchStore);
  }

  function prev() {
    batchStore.getPrevious($batchStore);
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
          <BatchTableRow items={$batchStore.page.items} index={i} />
        {/each}
      </tbody>
    </table>
    <TablePaginationButtons {next} {prev} pageNumber={$batchStore.pageNumber} />
  {/if}
</div>
