<script lang="ts">
  import InventoryTableRow from "./InventoryTableRow.svelte";
  import { inventoryStore } from "../../../stores/pagination";
  import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";

  function next() {
    inventoryStore.getNext($inventoryStore);
  }

  function prev() {
    inventoryStore.getPrevious($inventoryStore);
  }
</script>

<div class="flex flex-col justify-center w-full my-2">
  {#if $inventoryStore.isLoading}
    <span
      class="loading loading-spinner loading-lg bg-primary
            self-center"
    />
  {:else if !$inventoryStore.page || $inventoryStore.page.items.length === 0}
    <span class="text-center text-gray-500">No Inventory</span>
  {:else}
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Total Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each { length: inventoryStore.pageSize } as _, i}
          <InventoryTableRow items={$inventoryStore.page.items} index={i} />
        {/each}
      </tbody>
    </table>
    <dvi class="flex flex-row w-full justify-center items-center">
      <button class="btn btn-xs my-2 mx-1" on:click={prev}>
        <ArrowLeftIcon size="10" />
      </button>
      <span class="text-center text-gray-500">{$inventoryStore.pageNumber}</span
      >
      <button class="btn btn-xs my-2 mx-1" on:click={next}>
        <ArrowRightIcon size="10" />
      </button>
    </dvi>
  {/if}
</div>
