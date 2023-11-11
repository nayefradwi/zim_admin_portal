<script lang="ts">
    import type { Ingredient } from "../../../../data";

    export let ingredientItem: Ingredient;
</script>

<tr>
    {#if ingredientItem}
        <th>{ingredientItem.id}</th>
        <th>{ingredientItem.name}</th>
        {#if ingredientItem.brand}
            <th>{ingredientItem.brand}</th>
        {:else}
            <th>no brand</th>
        {/if}
        <th>{ingredientItem.price}QAR</th>
        <th>{ingredientItem.expiresInDays} Days</th>
        {#if ingredientItem.standardUnit}
            <th>{ingredientItem.standardUnit.name}</th>
        {:else}
            <th>No Unit</th>
        {/if}
    {/if}
</tr>
