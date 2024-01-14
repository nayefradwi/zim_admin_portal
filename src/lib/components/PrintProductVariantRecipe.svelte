<script lang="ts">
  import { type ProductVariant, type Recipe } from "../../data";
  export let variant: ProductVariant;
  export let recipes: Recipe[];
  export let quantity: number;
  export let totalCost: number;
  export let totalPrice: number;
</script>

<div class="p-4">
  <h1 class="text-xl font-medium">
    Recipe for: {variant.productName} - {variant.name} x {quantity}
    {variant.standardUnit?.symbol}
  </h1>
  <div class="my-1" />
  <hr />
  <div class="space-y-2 p-2">
    {#each recipes as recipe}
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <h2 class="font-medium">
            {recipe.productName} - {recipe.recipeVariantName}
          </h2>
          <p class="text-gray-600 sku">{recipe.recipeVariantSku}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-gray-600">
            x{(recipe.quantity * quantity).toFixed(2)}
            {recipe.unit.symbol}
          </p>
          <p class="text-gray-600">
            {(quantity * recipe.ingredientCost).toFixed(2)} QR
          </p>
        </div>
      </div>
    {/each}
  </div>
  <hr />
  <div class="flex flex-row justify-end items-center space-x-2">
    <div class="flex flex-col justify-center">
      <h2 class=" font-medium">Total Cost</h2>
    </div>
    <p class="text-gray-600 font-medium">
      {totalCost} QR
    </p>
  </div>

  <div class="flex flex-row justify-end items-center space-x-2">
    <div class="flex flex-col justify-center">
      <h2 class=" font-medium">Total Product Price</h2>
    </div>
    <p class="text-gray-600 font-medium">
      {totalPrice} QR
    </p>
  </div>
</div>

<style>
  .sku {
    font-size: 0.8rem;
  }
</style>
