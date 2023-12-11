<script lang="ts">
  import type { Product } from "../../../../data";
  import { navigate } from "svelte-routing";
  export let product: Product | undefined;

  function goToProduct() {
    if (!product) return;
    navigate(`/products/${product.id}`);
  }
</script>

<tr>
  {#if product}
    <th>{product.id}</th>
    <th>{product.name}</th>
    {#if product.description}
      <th>{product.description}</th>
    {:else}
      <th>no description</th>
    {/if}
    <th>
      <button on:click={goToProduct} class="btn no-animation btn-ghost btn-xs"
        >View</button
      >
    </th>
  {:else}
    <th>-</th>
    <th />
    <th />
    <th />
  {/if}
</tr>
