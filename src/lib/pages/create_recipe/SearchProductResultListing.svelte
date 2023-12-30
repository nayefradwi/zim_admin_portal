<script lang="ts">
  import type { ProductVariant } from "../../../data";

  export let productVariants: ProductVariant[];
</script>

<div>
  {#each productVariants as variant}
    <!-- product name -->
    <div>
      {variant.productName}
      {variant.name}
      {variant.sku}
      {variant.standardUnit?.name}
      {variant.price}
    </div>
    <!-- variant name -->
    <!-- unit -->
    <!-- cost -->
  {/each}
</div>
