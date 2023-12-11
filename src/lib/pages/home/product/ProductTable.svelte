<script lang="ts">
  import { type PaginatedModel, type Product } from "../../../../data";
  import TablePaginationButtons from "../../../components/TablePaginationButtons.svelte";
  import { productStore } from "../../../stores/pagination";
  import ProductTableRow from "./ProductTableRow.svelte";

  function next() {
    productStore.getNext($productStore);
  }

  function prev() {
    productStore.getPrevious($productStore);
  }
</script>

<div class="flex flex-col justify-center w-full my-2">
  {#if $productStore.isLoading}
    <span
      class="loading loading-spinner loading-lg bg-primary
            self-center"
    />
  {:else if !$productStore.page || $productStore.page.items.length === 0}
    <span class="text-center text-gray-500">No products found</span>
  {:else}
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $productStore.page.items as item}
          <ProductTableRow productItem={item} />
        {/each}
      </tbody>
    </table>
    <TablePaginationButtons
      {next}
      {prev}
      pageNumber={$productStore.pageNumber}
    />
  {/if}
</div>
