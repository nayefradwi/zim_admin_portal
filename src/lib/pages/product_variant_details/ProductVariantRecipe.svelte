<script lang="ts">
  import type { ProductVariant } from "../../../data";
  import RecipeListItem from "./RecipeListItem.svelte";
  import RecipeTitle from "./RecipeTitle.svelte";
  export let productVariant: ProductVariant;
</script>

<div class="card shadow bg-base-100 w-full p-4 overflow-y-auto">
  <div class="flex flex-row justify-between">
    <RecipeTitle {productVariant} />
  </div>
  <div class="my-2" />
  {#if productVariant.recipes && productVariant.recipes.length > 0}
    <div class="flex flex-col space-y-1">
      {#each productVariant.recipes as item}
        <RecipeListItem recipe={item} />
      {/each}
    </div>
  {:else}
    <div class="text-gray-500">No recipe</div>
    <div class="my-2 flex-grow" />
    <button class="btn btn-primary">Create recipe</button>
  {/if}
</div>

<style>
  .card {
    height: 65vh;
  }
</style>
