<script lang="ts">
    import type { Inventory } from "../../../../data";

    export let inventoryItem: Inventory;
    const totalPrice = inventoryItem.ingredient.price * inventoryItem.quantity;
</script>

<tr>
    {#if inventoryItem}
        <th>{inventoryItem.id}</th>
        <th>{inventoryItem.ingredient.name}</th>
        {#if inventoryItem.ingredient.brand}
            <th>{inventoryItem.ingredient.brand}</th>
        {:else}
            <th>no brand</th>
        {/if}
        <th>{totalPrice}QAR</th>
        {#if inventoryItem.unit}
            <th>{inventoryItem.quantity} {inventoryItem.unit.symbol}</th>
        {:else}
            <th>{inventoryItem.quantity}</th>
        {/if}
    {/if}
</tr>
