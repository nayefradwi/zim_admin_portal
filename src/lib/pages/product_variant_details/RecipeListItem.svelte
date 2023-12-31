<script lang="ts">
  import { TrashIcon } from "svelte-feather-icons";
  import type { Recipe } from "../../../data/models/recipe";

  export let recipe: Recipe;
  export let onRemove: (recipe: Recipe) => void;
</script>

<div class="flex flex-row space-x-2">
  <div class="font-semibold">{recipe.productName}</div>
  <div class="font-semibold">{recipe.recipeVariantName}</div>
  <div class="text-gray-500">x{recipe.quantity}</div>
  <div class="text-gray-500">{recipe.unit.symbol}</div>
  {#if recipe.unit.id !== recipe.ingredientStandardUnit.id}
    <div class="text-gray-500">
      (original unit: {recipe.ingredientStandardUnit.symbol})
    </div>
  {/if}

  <div class="flex-grow" />
  <div class="font-semibold">unit cost: {recipe.ingredientCost} QR</div>
  <button
    class="btn btn-xs btn-ghost p-0 text-error"
    on:click={() => onRemove(recipe)}><TrashIcon size="14" /></button
  >
</div>
