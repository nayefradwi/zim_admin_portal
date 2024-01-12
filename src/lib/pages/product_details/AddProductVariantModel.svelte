<script lang="ts">
  import toast from "svelte-french-toast";

  import { enforceNumber } from "../../utils/functions";

  export let showModal: boolean;
  export let productId: number;
  export let onSuccessCallback: () => void;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
  let isLoading: boolean = false;

  let sku: String | undefined;
  let price: number | undefined;
  let widthInCm: number | undefined;
  let heightInCm: number | undefined;
  let depthInCm: number | undefined;
  let weightInG: number | undefined;
  let standardUnitId: number | undefined;
  let expiresInDays: number | undefined;

  function isValid(): boolean {
    if (!price) {
      toast.error("Price is required");
      return false;
    }
    if (!sku || sku.length < 10 || sku.length > 36) {
      toast.error("SKU is required and must be between 10 and 36 characters");
      return false;
    }
    if (!expiresInDays || expiresInDays < 1) {
      toast.error("Expiry is required and must be greater than 0");
      return false;
    }
    if (!standardUnitId) {
      toast.error("Standard Unit is required");
      return false;
    }
    return true;
  }

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    dialog.close();
    sku = undefined;
    price = undefined;
    weightInG = undefined;
    widthInCm = undefined;
    heightInCm = undefined;
    depthInCm = undefined;
    standardUnitId = undefined;
    expiresInDays = undefined;
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Product Variant</h1>
    <div class="space-y-4 w-full">
      <div class="input-group">
        <input
          placeholder="Sku"
          class="input input-bordered input-sm"
          bind:value={sku}
        />
      </div>

      <div class="input-group">
        <input
          placeholder="Price"
          class="input input-bordered input-sm"
          min="1"
          type="number"
          bind:value={price}
          on:input={(e) => enforceNumber(e, true)}
        />
        <span class="input-label">QR</span>
      </div>

      <div class="input-group">
        <input
          placeholder="Width"
          class="input input-bordered input-sm w-max"
          min="1"
          type="number"
          bind:value={widthInCm}
          on:input={(e) => enforceNumber(e, true)}
        />
        <span class="input-label">cm</span>
      </div>

      <div class="input-group">
        <input
          placeholder="Height"
          class="input input-bordered input-sm"
          min="1"
          type="number"
          bind:value={heightInCm}
          on:input={(e) => enforceNumber(e, true)}
        />
        <span class="input-label">cm</span>
      </div>
      <div class="input-group">
        <input
          placeholder="Depth"
          class="input input-bordered input-sm"
          min="1"
          type="number"
          bind:value={depthInCm}
          on:input={(e) => enforceNumber(e, true)}
        />
        <span class="input-label">cm</span>
      </div>
      <div class="input-group">
        <input
          placeholder="Weight"
          class="input input-bordered input-sm"
          min="1"
          type="number"
          bind:value={weightInG}
          on:input={(e) => enforceNumber(e, true)}
        />
        <span class="input-label">g</span>
      </div>
    </div>

    <div class="modal-action mt-6">
      <button class="btn btn-primary">
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
  .input-group {
    display: flex;
    align-items: center;
  }

  .input-group .input {
    width: 90%;
  }

  .input-group span {
    width: 10%;
    margin-left: 4px;
  }
</style>
