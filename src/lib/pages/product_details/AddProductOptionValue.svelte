<script lang="ts">
  import toast from "svelte-french-toast";

  import {
    getResponse,
    ProductRepo,
    type Product,
    type ResponseHandlerData,
  } from "../../../data";

  export let showModal: boolean;
  export let product: Product;
  export let onSuccessCallback: () => void;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
  $: options = Object.values(product.options ?? {});

  let optionId: number | undefined = undefined;
  let isLoading: boolean = false;

  let optionValue: string | undefined;

  function isValid(): boolean {
    if (!optionId) {
      toast.error("Option is required");
      return false;
    }
    if (!optionValue || optionValue === "") {
      toast.error("Option value is required");
      return false;
    }
    return true;
  }

  function addProductOptionValue() {
    if (!isValid()) return;
    const details: ResponseHandlerData<void> = {
      call: () => {
        isLoading = true;
        return ProductRepo.addProductOptionValue({
          productOptionId: optionId!,
          value: optionValue!,
        });
      },
      onSuccess() {
        isLoading = false;
        toast.success("Product option value added successfully");
        onSuccessCallback();
        onClose();
      },
      onError() {
        isLoading = false;
      },
    };
    return getResponse<void>(details);
  }

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    dialog.close();
    optionValue = undefined;
    optionId = undefined;
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      Add Product Option Value
    </h1>

    <div class="space-y-4 w-full">
      <select
        bind:value={optionId}
        class="select select-bordered w-full select-sm"
      >
        {#each options as option}
          <option value={option.id}>{option.name}</option>
        {/each}
      </select>
      <input
        placeholder="Value"
        class="input input-bordered input-sm flex flex-row w-full"
        bind:value={optionValue}
      />
    </div>

    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={addProductOptionValue}>
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
