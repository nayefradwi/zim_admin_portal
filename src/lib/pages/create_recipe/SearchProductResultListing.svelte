<script lang="ts">
  import type { ProductVariant } from "../../../data";

  export let productVariants: ProductVariant[];
  export let onProductVariantSelected: (variant: ProductVariant) => void;
</script>

<div class="space-y-2 mt-2">
  {#each productVariants as variant}
    <div class="card bg-base-100 shadow">
      <div class="card-body p-4 items-start">
        <div class="card-title">{variant.productName} / {variant.name}</div>
        <div class="card-title">{variant.sku}</div>
        <p>product variant standard unit: {variant.standardUnit?.name}</p>
        <p>product variant standard unit cost: {variant.price}</p>
        <div class="card-actions justify-end self-end">
          <button
            class="btn btn-primary"
            on:click={() => onProductVariantSelected(variant)}
            >Add to recipe</button
          >
        </div>
      </div>
    </div>
  {/each}
</div>
