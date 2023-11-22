<script lang="ts">
  import { EyeIcon, MinusIcon, PlusIcon } from "svelte-feather-icons";
  import type { Inventory } from "../../../../data";
  import ModifyInventoryModal from "../../../components/ModifyInventoryModal.svelte";
  import { inventoryStore } from "../../../stores/pagination";
  let showIncrementModal: boolean = false;
  let showDecrementModal: boolean = false;
  export let items: Inventory[];
  export let index: number;
  let totalPrice: number;
  let item: Inventory | undefined;

  if (items && index < items.length) {
    item = items[index];
    totalPrice = item.ingredient.price * item.quantity;
  }

  function refresh() {
    inventoryStore.getFirstPage($inventoryStore);
  }
</script>

<tr>
  {#if item}
    <th>{item.id}</th>
    <th>{item.ingredient.name}</th>
    {#if item.ingredient.brand}
      <th>{item.ingredient.brand}</th>
    {:else}
      <th>no brand</th>
    {/if}
    <th>{totalPrice}QAR</th>
    {#if item.unit}
      <th>{item.quantity} {item.unit.symbol}</th>
    {:else}
      <th>{item.quantity}</th>
    {/if}
    <td>
      <button
        class="btn btn-ghost no-animation btn-xs p-0 m-0"
        on:click={() => (showIncrementModal = true)}
      >
        <ModifyInventoryModal
          inventory={item}
          bind:showModal={showIncrementModal}
          isIncrement={true}
          onSuccessfulModify={refresh}
        />
        <PlusIcon />
      </button>
      <button class="btn btn-ghost no-animation btn-xs p-0 m-0">
        <!-- TODO view ingredient -->
        <EyeIcon />
      </button>

      <button
        class="btn btn-ghost no-animation btn-xs p-0 m-0"
        on:click={() => (showDecrementModal = true)}
      >
        <ModifyInventoryModal
          inventory={item}
          bind:showModal={showDecrementModal}
          onSuccessfulModify={refresh}
        />
        <MinusIcon />
      </button>
    </td>
  {/if}
</tr>
