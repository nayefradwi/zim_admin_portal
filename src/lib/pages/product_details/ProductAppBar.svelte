<script lang="ts">
    import { XIcon } from "svelte-feather-icons";
    import { PRODUCTS_ROUTE } from "../../routes";
    import { navigate } from "svelte-routing";
    export let name: string;
    export let isArchived: boolean;
</script>

<div class="flex flex-row items-center my-2 justify-between">
    <div class="flex flex-row">
        <button
            on:click={() => {
                navigate(PRODUCTS_ROUTE, { replace: true });
            }}
        >
            <XIcon />
        </button>
        <h1 class="text-xl font-semibold text-left ml-2">
            Product: {name}
        </h1>
    </div>
    <div class="flex flex-row">
        <button class="action btn btn-primary btn-xs btn-outline rounded-none"
            >Create Batch</button
        >
        <button class="action btn btn-primary btn-xs btn-outline rounded-none"
            >Edit</button
        >
        {#if isArchived}
            <button
                class="action btn btn-success btn-xs btn-outline rounded-none"
                >Activate</button
            >
        {:else}
            <button class="action btn btn-error btn-xs btn-outline rounded-none"
                >Archive</button
            >
        {/if}
    </div>
</div>

<style>
    .action {
        @apply mx-1;
    }
</style>
