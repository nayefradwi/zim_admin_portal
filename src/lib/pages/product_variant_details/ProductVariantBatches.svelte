<script lang="ts">
  import { type Batch, ProductRepo, type ProductVariant } from "../../../data";
  import BatchTable from "../../components/BatchTable.svelte";
  import { createPaginationStore } from "../../stores/pagination";

  export let productVariant: ProductVariant;

  const variantBatches = createPaginationStore<Batch>(() =>
    ProductRepo.getBatchesBySku(productVariant.sku)
  );
  variantBatches.refresh($variantBatches);

  function onSuccessfulModify() {
    variantBatches.refresh($variantBatches);
  }
</script>

<BatchTable
  next={() => {}}
  prev={() => {}}
  batchPage={$variantBatches.page}
  isLoading={$variantBatches.isLoading}
  pageNumber={$variantBatches.pageNumber}
  tableSize={25}
  {onSuccessfulModify}
/>
