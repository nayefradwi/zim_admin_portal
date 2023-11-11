<script lang="ts">
    import { onMount } from "svelte";
    import {
        ProductRepo,
        type PaginatedModel,
        type Product,
        type ResponseHandlerData,
        getResponse,
    } from "../../../../data";
    import ProductTableRow from "./ProductTableRow.svelte";

    let pageSize = 10;
    let endCursor: string | undefined;
    let isLoading = true;
    let productsPage: PaginatedModel<Product>;

    const details: ResponseHandlerData<PaginatedModel<Product>> = {
        call: () => {
            isLoading = true;
            return ProductRepo.getProducts({
                pageSize,
                endCursor,
            });
        },
        onSuccess(data) {
            isLoading = false;
            if (data.total == 0) return;
            if (!productsPage) return (productsPage = data);
            productsPage.items = [...productsPage.items, ...data.items];
            productsPage.endCursor = data.endCursor;
        },
        onError(_) {
            isLoading = false;
        },
    };

    function load() {
        if (productsPage && !productsPage.hasNext) return;
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
    {:else if !productsPage || productsPage.items.length === 0}
        <span class="text-center text-gray-500">No products found</span>
    {:else}
        <table class="table table-xs">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {#each productsPage.items as item}
                    <ProductTableRow productItem={item} />
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
