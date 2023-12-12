<script lang="ts">
  import type { Product } from "../../../../data";
  import TablePaginationButtons from "../../../components/TablePaginationButtons.svelte";
  import { ingredientStore, productStore } from "../../../stores/pagination";
  import ProductTableRow from "./ProductTableRow.svelte";
  export let isProducts: boolean;

  function next() {
    productStore.getNext($productStore);
  }

  function prev() {
    productStore.getPrevious($productStore);
  }

  function getProduct(index: number): Product | undefined {
    if (!$productStore.page) return;
    if (index >= $productStore.page.items.length) return;
    return $productStore.page.items[index];
  }

  function getIngredientProduct(index: number): Product | undefined {
    if (!$ingredientStore.page) return;
    if (index >= $ingredientStore.page.items.length) return;
    return $ingredientStore.page.items[index];
  }
</script>

<div class="flex flex-col justify-center w-full my-2">
  {#if isProducts}
    {#if $productStore.isLoading}
      <span
        class="loading loading-spinner loading-lg bg-primary
            self-center"
      />
    {:else if !$productStore.page || $productStore.page.items.length === 0}
      <span class="text-center text-gray-500">No products found</span>
    {:else}
      <table class="table table-xs overflow-auto">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each { length: productStore.pageSize } as _, index}
            <ProductTableRow product={getProduct(index)} />
          {/each}
        </tbody>
      </table>
      <TablePaginationButtons
        {next}
        {prev}
        pageNumber={$productStore.pageNumber}
      />
    {/if}
  {/if}

  {#if !isProducts}
    {#if $ingredientStore.isLoading}
      <span
        class="loading loading-spinner loading-lg bg-primary
            self-center"
      />
    {:else if !$ingredientStore.page || $ingredientStore.page.items.length === 0}
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
          {#each { length: ingredientStore.pageSize } as _, index}
            <ProductTableRow product={getIngredientProduct(0)} />
          {/each}
        </tbody>
      </table>
      <TablePaginationButtons
        {next}
        {prev}
        pageNumber={$ingredientStore.pageNumber}
      />
    {/if}
  {/if}
</div>
