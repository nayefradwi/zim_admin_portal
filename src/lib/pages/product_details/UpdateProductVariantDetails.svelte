<script lang="ts">
  import toast from "svelte-french-toast";
  import {
    ProductRepo,
    getResponse,
    type ResponseHandlerData,
    type ProductVariant,
    type UpdateProductVariantDetailsRequest,
  } from "../../../data";
  import { enforceNumber } from "../../utils/functions";

  export let showModal: boolean;
  export let productVariant: ProductVariant | undefined;
  export let onSuccessCallback: () => void;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
  let price: number | undefined;
  let isLoading: boolean = false;
  let widthInCm: number | undefined;
  let heightInCm: number | undefined;
  let depthInCm: number | undefined;
  let weightInG: number | undefined;

  function updateVariant(): void {
    isLoading = true;
    if (!productVariant) return;
    if (!isValid()) return;
    const details: ResponseHandlerData<void> = {
      call: () => {
        const updateRequest: UpdateProductVariantDetailsRequest = {
          id: productVariant!.id,
          price: price!,
          widthInCm,
          heightInCm,
          depthInCm,
          weightInG,
        };
        return ProductRepo.updateProductVariantDetails(updateRequest);
      },
      onSuccess(_) {
        toast.success("Product variant updated successfully");
        isLoading = false;
        onClose();
        onSuccessCallback();
      },
      onError(error) {
        toast.error(error.message);
        isLoading = false;
      },
    };
    getResponse<void>(details);
  }

  function isValid(): boolean {
    if (!price) {
      toast.error("Price is required");
      return false;
    }
    return true;
  }

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    dialog.close();
    productVariant = undefined;
    weightInG = undefined;
    widthInCm = undefined;
    heightInCm = undefined;
    depthInCm = undefined;
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  {#if productVariant}
    <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        Update product variant
      </h1>
      <div class="space-y-4 w-full">
        <div class="input-group">
          <input
            placeholder="Price (old:{productVariant.price})"
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
        <button class="btn btn-primary" on:click={updateVariant}>
          {#if isLoading}
            <span class="loading loading-spinner" />
          {:else}
            Update
          {/if}
        </button>
        <form method="dialog">
          <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
  {/if}
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
