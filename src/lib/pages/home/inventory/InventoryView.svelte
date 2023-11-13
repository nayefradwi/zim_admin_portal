<script lang="ts">
    import InventoryTable from "./InventoryTable.svelte";
    let isBatches = true;
</script>

<div class="overflow-x-auto m-4 flex flex-col">
    <div class="my-4 mx-2 flex flex-row justify-end">
        <input
            type="text"
            placeholder="Search"
            class="input input-bordered mx-2 input-sm w-full"
        />
        <label class="swap mx-2">
            <input type="checkbox" bind:checked={isBatches} />
            <div
                class="swap-on btn no-animation btn-primary btn-outline btn-sm"
            >
                Products
            </div>
            <div
                class="swap-off btn no-animation btn-primary btn-outline btn-sm"
            >
                Ingredients
            </div>
        </label>
    </div>
    {#if isBatches}
        <InventoryTable />
    {:else}
        <InventoryTable />
    {/if}
</div>
