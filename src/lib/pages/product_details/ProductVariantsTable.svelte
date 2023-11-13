<script lang="ts">
    import type { ProductVariant } from "../../../data";
    import ProductVariantTableRow from "./ProductVariantTableRow.svelte";

    export let productVariants: ProductVariant[];
</script>

<table class="table table-xs">
    <thead>
        <tr>
            <th>Id</th>
            <th>Sku</th>
            <th>Name</th>
            <th>Price</th>
            <th>Details</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each productVariants as variant}
            <ProductVariantTableRow {variant} />
        {/each}
    </tbody>
</table>
