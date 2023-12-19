<script lang="ts">
  import type { Batch } from "../../../data";
  import { ArrowLeftIcon } from "svelte-feather-icons";
  import { HOME_ROUTE } from "../../routes";
  import { navigate } from "svelte-routing";
  export let batch: Batch;
  function goToHome() {
    navigate(HOME_ROUTE);
  }
</script>

<div class="flex flex-row items-end">
  <button on:click={goToHome}>
    <ArrowLeftIcon></ArrowLeftIcon>
  </button>
  <span class="mx-1" />
  <h1 class="text-xl font-semibold underline">
    {batch.productName} / {batch.productVariant.name} / {batch.sku}
  </h1>
</div>
