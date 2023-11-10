<script lang="ts">
    import type { PaginatedModel, Product } from "../../../../data";

    let pageSize = 10;
    let isLoading = true;
    let productsPage: PaginatedModel<Product>;
</script>

<div class="flex flex-col flex-1">
    <table class="table h-full flex-1">
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
                        <th>"no-image"</th>
                        <th>{productsPage.items[i].name}</th>
                        <th>{productsPage.items[i].description}</th>
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
        <button class="btn btn-xs my-2 mx-1">Previous</button>
        <button class="btn btn-xs my-2 mx-1">Next</button>
    </dvi>
</div>
