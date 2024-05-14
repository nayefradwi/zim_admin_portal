<script lang="ts">
  import type { ProductVariant } from "../../../data";
  import { enforceNumber } from "../../utils/functions";
  import { printProductVariantRecipe } from "../../utils/print";

  export let showModal: boolean;
  export let productVariant: ProductVariant;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();

  let quantity: number = 1;

  function print() {
    if (!productVariant) return;
    if (quantity < 1) return;
    printProductVariantRecipe(productVariant, quantity);
  }

  function onClose() {
    quantity = 1;
    showModal = false;
    dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Print Recipe</h1>
    <input
      placeholder="Height"
      class="input input-bordered input-sm w-full"
      min="1"
      type="number"
      bind:value={quantity}
      on:input={(e) => enforceNumber(e, true)}
    />

    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={print}>Print </button>
      <form method="dialog">
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
