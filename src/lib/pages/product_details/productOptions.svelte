<script lang="ts">
  import type { ProductOption } from "../../../data";

  export let productOptions: Record<string, ProductOption> | undefined;
</script>

<div class="flex flex-row flex-wrap">
  {#if productOptions}
    {#each Object.keys(productOptions) as key}
      {#if productOptions[key]}
        <div class="chip">{productOptions[key].name}</div>
        {#each productOptions[key].values as optionValue}
          <div class="chip">{optionValue.value}</div>
        {/each}
      {/if}
    {/each}
  {/if}
</div>

<style>
  .chip {
    @apply m-1;
    @apply font-light;
    @apply text-xs;
    @apply p-1;
    @apply bg-base-200;
    @apply rounded-lg;
  }
</style>
