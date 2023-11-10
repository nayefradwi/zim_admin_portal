<script lang="ts">
    import ProductTable from "./ProductTable.svelte";
    import { PlusCircleIcon } from "svelte-feather-icons";
</script>

<div class="overflow-x-auto m-4 shadow-md flex flex-col h-5/6">
    <div class="m-4 flex flex-row justify-end">
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
    <ProductTable />
</div>
