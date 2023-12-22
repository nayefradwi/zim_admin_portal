<script lang="ts">
  import type { Product, ProductVariant } from "../../../data";
  import ProductVariantsTable from "./ProductVariantsTable.svelte";
  export let product: Product;
  export let productVariants: ProductVariant[];
</script>

<div class="h-full">
  <div class="divider flex flex-row my-1">
    <!-- TODO add varaint -->
    <button class="btn btn-xs mx-1">Add Variant</button>
    <!-- TODO add product option -->
    <button class="btn btn-xs mx-1">Add Product Option</button>
    <!-- TODO add option value -->
    <button class="btn btn-xs mx-1">Add Option Value</button>
  </div>
  <div class="flex flex-col my-4 h-full">
    <ProductVariantsTable {productVariants} bind:product />
  </div>
</div>
