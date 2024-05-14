<script lang="ts">
  import { TrashIcon } from "svelte-feather-icons";
  import type { AddRecipeVM } from "../../view_models/addRecipeVM";
  export let recipes: AddRecipeVM[];
  export let onCreateRecipe: () => void;
  export let onRecipeRemove: (recipe: AddRecipeVM) => void;
  $: totalCost = recipes.reduce((acc, curr) => acc + curr.totalCost, 0);
</script>

<div class="w-1/2 flex flex-col">
  <div class="flex flex-row justify-between items-start">
    <h2 class="font-medium">Recipe ({totalCost} QR)</h2>
    <button class="btn btn-outline btn-primary btn-xs" on:click={onCreateRecipe}
      >Create Recipe</button
    >
  </div>
  <div class="divider"></div>
  {#each recipes as recipe}
    <div class="flex flex-row space-x-2">
      <div class="font-semibold">{recipe.productName}</div>
      <div class="font-semibold">{recipe.recipeVariantName}</div>
      <div class="text-gray-500">x{recipe.quantity}</div>
      <div class="text-gray-500">{recipe.unitSymbol}</div>
      <div class="flex-grow" />
      <div class="font-semibold">total cost: {recipe.totalCost} QR</div>
      <button
        class="btn btn-xs btn-ghost p-0 text-error"
        on:click={() => onRecipeRemove(recipe)}><TrashIcon size="14" /></button
      >
    </div>
  {/each}
</div>
