<script lang="ts">
    import { onMount } from "svelte";
    import {
        ProductRepo,
        type PaginatedModel,
        type Product,
        type ResponseHandlerData,
        getResponse,
    } from "../../../../data";

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
            endCursor = data.endCursor;
            productsPage = data;
        },
        onError(_) {
            isLoading = false;
        },
    };

    function load() {
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
    {:else}
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {#each { length: pageSize } as _, i}
                    <tr>
                        {#if productsPage && productsPage.items[i]}
                            <th>{productsPage.items[i].id}</th>
                            <!-- TODO fill in image -->
                            <th>no-image</th>
                            <th>{productsPage.items[i].name}</th>
                            {#if productsPage.items[i].description}
                                <th>{productsPage.items[i].description}</th>
                            {:else}
                                <th>no description</th>
                            {/if}
                        {:else}
                            <th />
                            <th />
                            <th />
                            <th />
                        {/if}
                    </tr>
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
