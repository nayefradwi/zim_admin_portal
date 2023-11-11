<script lang="ts">
    import type { Product } from "../../../../data";

    export let productItem: Product;
</script>

<tr>
    {#if productItem}
        <th>{productItem.id}</th>
        <!-- TODO fill in image -->
        <th>no-image</th>
        <th>{productItem.name}</th>
        {#if productItem.description}
            <th>{productItem.description}</th>
        {:else}
            <th>no description</th>
        {/if}
    {/if}
</tr>
