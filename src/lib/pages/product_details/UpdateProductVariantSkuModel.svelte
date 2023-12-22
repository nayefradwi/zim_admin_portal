<script lang="ts">
  import toast from "svelte-french-toast";
  import {
    ProductRepo,
    getResponse,
    type ResponseHandlerData,
  } from "../../../data";

  export let showModal: boolean;
  export let currentSku: string;
  export let onSuccessCallback: () => void;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
  let isLoading: boolean = false;
  let newSku: string | undefined;
  $: newSku = newSku?.replace(/\s+/g, "").toUpperCase();

  function updateSku(): void {
    isLoading = true;
    if (!newSku) return;
    const details: ResponseHandlerData<void> = {
      call: () =>
        ProductRepo.updateProductSku({
          oldSku: currentSku,
          newSku: newSku!,
        }),
      onSuccess() {
        isLoading = false;
        dialog.close();
        toast.success("Sku updated!");
        onSuccessCallback();
      },
      onError() {
        isLoading = false;
        toast.error("Failed to update sku!");
      },
    };
    getResponse<void>(details);
  }

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    newSku = undefined;
    currentSku = "";
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Update sku / Barcode</h1>
    <div class="space-y-4">
      <input
        placeholder="Sku / Barcode"
        class="input input-bordered input-sm w-full"
        maxlength="36"
        bind:value={newSku}
      />
    </div>
    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={updateSku}>Update</button>
      <form method="dialog">
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
