<script lang="ts">
    import { onMount } from "svelte";
    import {
        ProductRepo,
        type PaginatedModel,
        type Batch,
        type ResponseHandlerData,
        getResponse,
    } from "../../../../data";
    import BatchTableRow from "./BatchTableRow.svelte";

    let pageSize = 10;
    let endCursor: string | undefined;
    let isLoading = true;
    let batchPage: PaginatedModel<Batch>;

    const details: ResponseHandlerData<PaginatedModel<Batch>> = {
        call: () => {
            isLoading = true;
            return ProductRepo.getBatches({
                pageSize,
                endCursor,
            });
        },
        onSuccess(data) {
            isLoading = false;
            if (data.total == 0) return;
            if (!batchPage) return (batchPage = data);
            batchPage.items = [...batchPage.items, ...data.items];
            batchPage.endCursor = data.endCursor;
        },
        onError(_) {
            isLoading = false;
        },
    };

    function load() {
        if (batchPage && !batchPage.hasNext) return;
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
    {:else if !batchPage || batchPage.items.length === 0}
        <span class="text-center text-gray-500">No Batches</span>
    {:else}
        <table class="table table-xs">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Sku</th>
                    <th>Name</th>
                    <th>Total Worth</th>
                    <th>Quantity</th>
                    <th>Expires At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each batchPage.items as item}
                    <BatchTableRow batchItem={item} />
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
