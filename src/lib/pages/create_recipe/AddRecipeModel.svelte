<script lang="ts">
  import toast from "svelte-french-toast";
  import { unitStore } from "../../stores/unit";
  import { enforceNumber } from "../../utils/functions";
  import { type ProductVariant } from "../../../data";
  export let showModal: boolean;
  export let productVariant: ProductVariant | undefined;
  export let onAddToRecipe: (variant: ProductVariant, quantity: number) => void;
  $: if (dialog && showModal) dialog.showModal();
  let isLoading: boolean = false;
  let dialog: HTMLDialogElement;
  let quantity: number | undefined;
  let unitId: number | undefined;
  //   TODO add unit to recipe
  $: unitId = unitId == undefined ? $unitStore[0]?.id : unitId;

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    quantity = undefined;
    productVariant = undefined;
  }

  function isValid(): boolean {
    const isValid: boolean =
      quantity !== undefined && quantity > 0 && productVariant != undefined;
    if (!isValid) toast.error("Please fill all fields");
    return isValid;
  }

  function addToRecipe() {
    if (isLoading) return;
    if (!isValid()) return;
    onAddToRecipe(productVariant!, quantity!);
    dialog.close();
    onClose();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Add To Recipe</h1>

    <div class="space-y-4">
      <input
        type="number"
        placeholder="Quantity: x {productVariant?.standardUnit?.name}"
        class="input input-bordered input-sm w-full"
        min="1"
        on:input={(e) => enforceNumber(e, true)}
        bind:value={quantity}
      />

      <select bind:value={unitId} class="select select-bordered w-full">
        {#each $unitStore as unit}
          <option value={unit.id}>{unit.name}</option>
        {/each}
      </select>
    </div>

    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={addToRecipe}>
        {#if isLoading}
          <span class="loading loading-spinner" />
        {:else}
          Add
        {/if}
      </button>
      <form method="dialog">
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>

<style>
</style>
