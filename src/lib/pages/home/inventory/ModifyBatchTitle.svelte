<script lang="ts">
  import { type Batch } from "../../../../data";

  export let batch: Batch;
  export let newStock: number;
  export let isIncrement: boolean;
</script>

<div class="flex flex-col items-start justify-center">
  <h3 class="font-bold text-lg">
    {isIncrement ? "Increment Batch:" : "Decrement Batch:"}
    {batch.productName} / {batch.productVariant.name}
  </h3>
  <p class="py-4">
    Current stock: {newStock}{batch.unit ? batch.unit.symbol : ""}
  </p>
</div>
