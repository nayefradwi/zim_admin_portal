<script lang="ts">
    import { EyeIcon, MinusIcon, PlusIcon } from "svelte-feather-icons";
    import type { Inventory } from "../../../../data";
    import ModifyInventoryModal from "../../../components/ModifyInventoryModal.svelte";
    let showIncrementModal: boolean = false;
    let showDecrementModal: boolean = false;
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
        <td>
            <button
                class="btn btn-ghost no-animation btn-xs p-0 m-0"
                on:click={() => (showIncrementModal = true)}
            >
                <ModifyInventoryModal
                    inventory={inventoryItem}
                    bind:showModal={showIncrementModal}
                    isIncrement={true}
                />
                <PlusIcon />
            </button>
            <button class="btn btn-ghost no-animation btn-xs p-0 m-0">
                <!-- TODO view ingredient -->
                <EyeIcon />
            </button>

            <button
                class="btn btn-ghost no-animation btn-xs p-0 m-0"
                on:click={() => (showDecrementModal = true)}
            >
                <ModifyInventoryModal
                    inventory={inventoryItem}
                    bind:showModal={showDecrementModal}
                />
                <MinusIcon />
            </button>
        </td>
    {/if}
</tr>
