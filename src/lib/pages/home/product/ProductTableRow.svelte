<script lang="ts">
    import type { Product } from "../../../../data";

    export let productItem: Product;
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
            <button class="btn no-animation btn-ghost btn-xs">View</button>
        </th>
    {/if}
</tr>
