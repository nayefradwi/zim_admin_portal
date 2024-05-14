<script lang="ts">
    import { onMount } from "svelte";
    import {
        type Warehouse,
        type ResponseHandlerData,
        WarehouseRepo,
        getResponse,
    } from "../../../data";
    import WarehouseItem from "./WarehouseItem.svelte";

    let isLoading: boolean = false;
    let warehouses: Warehouse[] = [];

    const details: ResponseHandlerData<Warehouse[]> = {
        call: () => WarehouseRepo.getWarehouses(),
        onSuccess: (data) => {
            isLoading = false;
            warehouses = data;
        },
        onError: (error) => {
            isLoading = false;
            warehouses = [];
        },
    };

    onMount(() => {
        isLoading = true;
        getResponse(details);
    });
</script>

<main class="h-screen bg-primary flex flex-col justify-center items-center">
    <div class="text-base-100 font-semibold text-2xl">
        Select your warehouse
    </div>
    {#if isLoading || !warehouses}
        <span class="loading loading-spinner loading-lg bg-base-100" />
    {:else}
        <div class="flex flex-row flex-wrap">
            {#each warehouses as warehouse}
                <WarehouseItem {warehouse} />
            {/each}
        </div>
    {/if}
</main>
