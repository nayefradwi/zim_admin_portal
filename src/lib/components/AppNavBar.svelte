<script lang="ts">
    import { navigate } from "svelte-routing";
    import { DASHBOARD_ROUTE, WAREHOUSE_SELECT_ROUTE } from "../routes";
    import { setWarehouseHeader } from "../../data";
    import { warehouseStore } from "../stores/warehouse";
    import { XIcon, AlignJustifyIcon } from "svelte-feather-icons";
    import { drawerToggle } from "../stores/drawer";
    function changeWarehouse() {
        setWarehouseHeader(null);
        navigate(WAREHOUSE_SELECT_ROUTE);
    }
    function goToDashboard() {
        navigate(DASHBOARD_ROUTE);
    }
</script>

<div class="navbar bg-base-100 shadow">
    <label class="swap mx-2">
        <input
            type="checkbox"
            class="drawer-toggle"
            bind:checked={$drawerToggle}
        />
        <XIcon class="swap-on" />
        <AlignJustifyIcon class="swap-off" />
    </label>
    <div class="flex-1">
        <button
            class="btn btn-ghost normal-case text-xl no-animation"
            on:click={goToDashboard}>Zanobia Inventory Manager</button
        >
    </div>
    {#if $warehouseStore}
        <div class="flex-none">
            <button
                class="btn btn-ghost btn-error btn-sm text-error"
                on:click={changeWarehouse}
            >
                Change {$warehouseStore.name} Warehouse
            </button>
        </div>
    {:else}
        <span class="loading loading-spinner bg-ghost btn-sm text-error" />
    {/if}
</div>
