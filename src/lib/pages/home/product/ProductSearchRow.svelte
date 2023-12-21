<script lang="ts">
  import { PlusCircleIcon } from "svelte-feather-icons";

  export let isProducts = true;
  export let onClick: () => void;
</script>

<div class="my-4 mx-1 flex flex-row justify-end">
  <div class="flex flex-row justify-start w-full">
    <h1 class="text-2xl font-semibold">Products</h1>
  </div>
  <button class="btn btn-primary btn-sm btn-outline" on:click={onClick}>
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
