<script lang="ts">
    import IngredientTable from "./IngredientTable.svelte";
    import ProductTable from "./ProductTable.svelte";
    import { PlusCircleIcon } from "svelte-feather-icons";
    let isProducts = true;
</script>

<div class="overflow-x-auto m-4 shadow-md flex flex-col">
    <div class="m-2 flex flex-row justify-end">
        <label class="swap">
            <input
                type="checkbox"
                bind:checked={isProducts}
                on:change={() => console.log(isProducts)}
            />
            <div class="swap-on">Products</div>
            <div class="swap-off">Ingredients</div>
        </label>
        <input
            type="text"
            placeholder="Search"
            class="input input-bordered mx-2 input-sm w-2/4"
        />

        <button class="btn btn-primary btn-sm btn-outline">
            <PlusCircleIcon />
            Add
        </button>
    </div>
    <div class="divider" />
    {#if isProducts}
        <ProductTable />
    {:else}
        <IngredientTable />
    {/if}
</div>
