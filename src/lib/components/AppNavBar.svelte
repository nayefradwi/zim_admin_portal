<script lang="ts">
  import { navigate } from "svelte-routing";
  import { HOME_ROUTE, WAREHOUSE_SELECT_ROUTE } from "../routes";
  import { setWarehouseHeader } from "../../data";
  import { warehouseStore } from "../stores/warehouse";
  import { XIcon, AlignJustifyIcon } from "svelte-feather-icons";
  import { drawerToggle } from "../stores/drawer";
  export let showDrawerBtn: boolean = false;
  function changeWarehouse() {
    setWarehouseHeader(null);
    navigate(WAREHOUSE_SELECT_ROUTE);
  }
  function goToHome() {
    navigate(HOME_ROUTE);
  }
</script>

<div class="navbar bg-base-100 shadow">
  {#if showDrawerBtn}
    <label class="swap mx-2">
      <input
        type="checkbox"
        class="drawer-toggle"
        bind:checked={$drawerToggle}
      />
      <XIcon class="swap-on" />
      <AlignJustifyIcon class="swap-off" />
    </label>
  {/if}

  <div class="flex-1">
    <button
      class="btn btn-ghost normal-case text-xl no-animation"
      on:click={goToHome}>Zanobia Inventory Manager</button
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
