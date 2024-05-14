<script lang="ts">
  import type { ProductVariant } from "../../../data";
  import { ArrowLeftIcon } from "svelte-feather-icons";

  export let variant: ProductVariant;
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
    {variant.productName ? variant.productName : ""} / {variant.name} / {variant.sku}
  </h1>
</div>
