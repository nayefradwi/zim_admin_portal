<script lang="ts">
  import { TrashIcon } from "svelte-feather-icons";
  import type { AddRecipeVM } from "../../view_models/addRecipeVM";

  export let recipes: AddRecipeVM[];
</script>

<div class="w-1/2 flex flex-col">
  <h2 class="font-medium">Recipe</h2>
  {#each recipes as recipe}
    <div class="flex flex-row space-x-2">
      <div class="font-semibold">{recipe.productName}</div>
      <div class="font-semibold">{recipe.recipeVariantName}</div>
      <div class="text-gray-500">x{recipe.quantity}</div>
      <div class="text-gray-500">{recipe.unitSymbol}</div>
      <div class="flex-grow" />
      <div class="font-semibold">total cost: {recipe.totalCost} QR</div>
      <button class="btn btn-xs btn-ghost p-0 text-error"
        ><TrashIcon size="14" /></button
      >
    </div>
  {/each}
</div>
