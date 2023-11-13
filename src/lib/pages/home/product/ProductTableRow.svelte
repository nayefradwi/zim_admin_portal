<script lang="ts">
    import type { Product } from "../../../../data";
    import { navigate } from "svelte-routing";
    export let productItem: Product;

    function goToProduct() {
        navigate(`/products/${productItem.id}`);
    }
</script>

<tr>
    {#if productItem}
        <th>{productItem.id}</th>
        <th>{productItem.name}</th>
        {#if productItem.description}
            <th>{productItem.description}</th>
        {:else}
            <th>no description</th>
        {/if}
        <th>
            <button
                on:click={goToProduct}
                class="btn no-animation btn-ghost btn-xs">View</button
            >
        </th>
    {/if}
</tr>
