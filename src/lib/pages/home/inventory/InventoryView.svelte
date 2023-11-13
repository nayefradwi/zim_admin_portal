<script lang="ts">
    import BatchTable from "./BatchTable.svelte";
    import InventoryTable from "./InventoryTable.svelte";
    let isBatches = true;
</script>

<div class="overflow-x-auto m-4 flex flex-col">
    <div class="my-4 mx-1 flex flex-row justify-end">
        <input
            type="text"
            placeholder="Search"
            class="input input-bordered mr-2 input-sm w-full"
        />
        {#if isBatches}
            <!-- TODO create batch -->
            <button class="btn btn-outline btn-primary btn-sm no-animation"
                >Create Batch</button
            >
        {:else}
            <!-- TODO create batch -->
            <button class="btn btn-outline btn-primary btn-sm no-animation"
                >Create Inventory</button
            >
        {/if}
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
        <BatchTable />
    {:else}
        <InventoryTable />
    {/if}
</div>
