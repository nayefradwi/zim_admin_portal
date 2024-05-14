<script lang="ts">
  import type { ProductVariant } from "../../../data";

  export let variant: ProductVariant;
  export let newStock: number;
</script>

<div class="flex flex-col items-start justify-center">
  <h3 class="font-bold text-lg">
    Create batch:
    {variant.name}
  </h3>
  <p class="py-4">
    Current stock: {newStock}{variant.standardUnit?.symbol}
  </p>
</div>
