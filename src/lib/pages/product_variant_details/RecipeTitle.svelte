<script lang="ts">
  import { PlusIcon } from "svelte-feather-icons";
  import type { ProductVariant } from "../../../data";

  export let productVariant: ProductVariant;
</script>

<h1 class="text-xl font-medium self-start">Recipe</h1>
<div class="flex flex-row space-x-1">
  <button class="btn btn-outline btn-xs btn-primary">Print recipe</button>
  {#if productVariant.recipes && productVariant.recipes.length > 0}
    <button class="btn btn-outline btn-xs btn-primary"
      ><PlusIcon size="14" /></button
    >
  {/if}
</div>
