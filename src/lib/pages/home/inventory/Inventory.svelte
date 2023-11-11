<script lang="ts">
    import IngredientTable from "../product/IngredientTable.svelte";
    import ProductTable from "../product/ProductTable.svelte";
    import { PlusCircleIcon } from "svelte-feather-icons";
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
            <input
                type="checkbox"
                bind:checked={isBatches}
                on:change={() => console.log(isBatches)}
            />
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
        <ProductTable />
    {:else}
        <IngredientTable />
    {/if}
</div>
