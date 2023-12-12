<script lang="ts">
  import type { Product } from "../../../../data";
  import { navigate } from "svelte-routing";
  import type { MenuOptionItem } from "../../../view_models/menuOptionItem";
  import VerticalViewMore from "../../../components/VerticalViewMore.svelte";
  export let product: Product | undefined;
  const productOptions: MenuOptionItem[] = [
    {
      name: "View Details",
      onClick: goToProduct,
    },
  ];
  function goToProduct(e: any) {
    e.preventDefault();
    if (!product) return;
    navigate(`/products/${product.id}`);
  }
</script>

<tr class="hover" on:click={goToProduct}>
  {#if product}
    <th>{product.id}</th>
    <th>{product.name}</th>
    {#if product.description}
      <th>{product.description}</th>
    {:else}
      <th>no description</th>
    {/if}
    <td><VerticalViewMore items={productOptions} /></td>
  {:else}
    <th>-</th>
    <th />
    <th />
    <th />
  {/if}
</tr>
