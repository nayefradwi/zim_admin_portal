<script lang="ts">
    import { onMount } from "svelte";
    import {
        IngredientRepo,
        type PaginatedModel,
        type Ingredient,
        type ResponseHandlerData,
        getResponse,
    } from "../../../../data";
    import IngredientTableRow from "./IngredientTableRow.svelte";

    let pageSize = 10;
    let endCursor: string | undefined;
    let isLoading = true;
    let ingredientsPage: PaginatedModel<Ingredient>;

    const details: ResponseHandlerData<PaginatedModel<Ingredient>> = {
        call: () => {
            isLoading = true;
            return IngredientRepo.getIngredients({
                pageSize,
                endCursor,
            });
        },
        onSuccess(data) {
            isLoading = false;
            if (data.total == 0) return;
            if (!ingredientsPage) return (ingredientsPage = data);
            ingredientsPage.items = [...ingredientsPage.items, ...data.items];
            ingredientsPage.endCursor = data.endCursor;
        },
        onError(_) {
            isLoading = false;
        },
    };

    function load() {
        if (ingredientsPage && !ingredientsPage.hasNext) return;
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
    {:else if !ingredientsPage || ingredientsPage.items.length === 0}
        <span class="text-center text-gray-500">No products found</span>
    {:else}
        <table class="table table-xs">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Expires In</th>
                    <th>Unit</th>
                </tr>
            </thead>
            <tbody>
                {#each ingredientsPage.items as item}
                    <IngredientTableRow ingredientItem={item} />
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
