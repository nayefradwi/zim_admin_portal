<script lang="ts">
  import type { Batch } from "../../../data";
  import { ArrowLeftIcon } from "svelte-feather-icons";
  export let batch: Batch;
  function goBack() {
    window.history.back();
  }
</script>

<div class="flex flex-row items-end">
  <button on:click={goBack}>
    <ArrowLeftIcon></ArrowLeftIcon>
  </button>
  <span class="mx-1" />
  <h1 class="text-xl font-semibold underline">
    {batch.productName} / {batch.productVariant.name} / {batch.sku}
  </h1>
</div>
