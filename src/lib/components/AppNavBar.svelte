<script lang="ts">
    import { navigate } from "svelte-routing";
    import { DASHBOARD_ROUTE, WAREHOUSE_SELECT_ROUTE } from "../routes";
    import { setWarehouseHeader } from "../../data";
    import { warehouseStore } from "../stores/warehouse";
    function changeWarehouse() {
        setWarehouseHeader(null);
        navigate(WAREHOUSE_SELECT_ROUTE);
    }
    function goToDashboard() {
        navigate(DASHBOARD_ROUTE);
    }
</script>

<div class="navbar bg-base-100 shadow">
    <div class="flex-1">
        <button
            class="btn btn-ghost normal-case text-xl no-animation"
            on:click={goToDashboard}>Zanobia Inventory Manager</button
        >
    </div>
    {#if $warehouseStore}
        <div class="flex-none">
            <button
                class="btn btn-outline btn-error"
                on:click={changeWarehouse}
            >
                Change {$warehouseStore.name} Warehouse
            </button>
        </div>
    {:else}
        <span class="loading loading-spinner bg-error" />
    {/if}
</div>
