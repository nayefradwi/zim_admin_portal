<script lang="ts">
  import type { Product } from "../../../../data";
  import TablePaginationButtons from "../../../components/TablePaginationButtons.svelte";
  import type { PaginationState } from "../../../stores/pagination";
  import ProductListItem from "./ProductListItem.svelte";
  import ProductLoading from "./ProductLoading.svelte";
  export let state: PaginationState<Product>;
  export let prev = () => {};
  export let next = () => {};
</script>

<div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    {#if state.page && !state.isLoading}
      {#each state.page.items as product (product.id)}
        <ProductListItem {product} />
      {/each}
    {:else}
      <ProductLoading />
    {/if}
  </div>
  <TablePaginationButtons {prev} {next} pageNumber={state.pageNumber} />
</div>
