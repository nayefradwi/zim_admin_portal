<script lang="ts">
  import ProductList from "./ProductList.svelte";
  import { PlusCircleIcon } from "svelte-feather-icons";
  let isProducts = true;
</script>

<div class="overflow-x-auto overflow-y-auto m-4 flex flex-col">
  <div class="my-4 mx-1 flex flex-row justify-end">
    <div class="flex flex-row justify-start w-full">
      <h1 class="text-2xl font-semibold">Products</h1>
    </div>
    <button class="btn btn-primary btn-sm btn-outline">
      <PlusCircleIcon />
      Add
    </button>
    <label class="swap mx-2">
      <input type="checkbox" bind:checked={isProducts} />
      <div class="swap-on btn no-animation btn-primary btn-outline btn-sm">
        Products
      </div>
      <div class="swap-off btn no-animation btn-primary btn-outline btn-sm">
        Ingredients
      </div>
    </label>
  </div>
  <ProductList bind:isProducts />
</div>
