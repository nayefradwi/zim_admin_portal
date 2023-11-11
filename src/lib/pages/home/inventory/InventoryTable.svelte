<script lang="ts">
    import { onMount } from "svelte";
    import {
        IngredientRepo,
        type PaginatedModel,
        type Inventory,
        type ResponseHandlerData,
        getResponse,
    } from "../../../../data";
    import InventoryTableRow from "./InventoryTableRow.svelte";

    let pageSize = 10;
    let endCursor: string | undefined;
    let isLoading = true;
    let inventoryPage: PaginatedModel<Inventory>;

    const details: ResponseHandlerData<PaginatedModel<Inventory>> = {
        call: () => {
            isLoading = true;
            return IngredientRepo.getInventory({
                pageSize,
                endCursor,
            });
        },
        onSuccess(data) {
            isLoading = false;
            if (data.total == 0) return;
            if (!inventoryPage) return (inventoryPage = data);
            inventoryPage.items = [...inventoryPage.items, ...data.items];
            inventoryPage.endCursor = data.endCursor;
        },
        onError(_) {
            isLoading = false;
        },
    };

    function load() {
        if (inventoryPage && !inventoryPage.hasNext) return;
        return getResponse(details);
    }

    onMount(() => {
        load();
    });
</script>

<div class="flex flex-col justify-center w-full my-2">
    {#if isLoading}
        <span
            class="loading loading-spinner loading-lg bg-primary
            self-center"
        />
    {:else if !inventoryPage || inventoryPage.items.length === 0}
        <span class="text-center text-gray-500">No Inventory</span>
    {:else}
        <table class="table table-xs">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Total Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {#each inventoryPage.items as item}
                    <InventoryTableRow inventoryItem={item} />
                {/each}
            </tbody>
        </table>
        <dvi class="flex flex-row w-full justify-center">
            <button class="btn btn-xs my-2 mx-1" on:click={load}
                >Load More</button
            >
        </dvi>
    {/if}
</div>
