<script lang="ts">
    import type { ProductVariant } from "../../../data";
    import ProductVariantsTable from "./ProductVariantsTable.svelte";

    export let productVariants: ProductVariant[];
</script>

<div>
    <div class="divider flex flex-row my-1">
        <button class="btn btn-xs mx-1">Add Variant</button>
        <button class="btn btn-xs mx-1">Add Product Option</button>
        <button class="btn btn-xs mx-1">Add Option Value</button>
    </div>
    <div class="overflow-auto flex flex-col my-4">
        <ProductVariantsTable {productVariants} />
    </div>
</div>
