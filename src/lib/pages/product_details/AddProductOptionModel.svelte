<script lang="ts">
  import toast from "svelte-french-toast";

  import {
    getResponse,
    ProductRepo,
    type Product,
    type ResponseHandlerData,
    type AddProductOptionRequest,
  } from "../../../data";

  export let showModal: boolean;
  export let product: Product;
  export let onSuccessCallback: () => void;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();

  let optionName: string | undefined = undefined;
  let isLoading: boolean = false;
  let optionValue: string | undefined;

  let optionValues: string[] = [];
  let defaultOptionValue: string = "";

  function isValid(): boolean {
    if (!optionName || optionName === "") {
      toast.error("Option is required");
      return false;
    }
    if (optionValues.length === 0) {
      toast.error("Option must have at least one value");
      return false;
    }
    return true;
  }

  function addOptionToProduct() {
    if (!isValid()) return;
    const request: AddProductOptionRequest = {
      optionName: optionName!,
      values: optionValues.map((value) => ({
        value: value,
        isDefault: value === defaultOptionValue,
      })),
      productId: product.id,
    };
    const details: ResponseHandlerData<void> = {
      call: () => {
        isLoading = true;
        return ProductRepo.addProductOption(request);
      },
      onSuccess() {
        isLoading = false;
        toast.success("Product option added successfully");
        onSuccessCallback();
        onClose();
      },
      onError() {
        isLoading = false;
      },
    };
    return getResponse<void>(details);
  }

  function onEnterClicked(event: KeyboardEvent) {
    if (event.key === "Enter") addOptionValue();
  }

  function addOptionValue() {
    if (!optionValue) return;
    if (optionValue === "") return;
    if (optionValues.includes(optionValue)) return;
    if (defaultOptionValue === "") defaultOptionValue = optionValue;
    optionValues.push(optionValue);
    optionValues = [...optionValues];
    optionValue = "";
  }

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    dialog.close();
    optionName = undefined;
    optionValues = [];
    defaultOptionValue = "";
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      Add Option To {product.name}
    </h1>

    <div class="space-y-4 w-full">
      <input
        placeholder="Option Name"
        class="input input-bordered input-sm flex flex-row w-full"
        bind:value={optionName}
      />
      <input
        class="input input-bordered input-sm flex flex-row w-full"
        placeholder="Option value"
        on:keydown={onEnterClicked}
        bind:value={optionValue}
      />
      {#each optionValues as optionValue}
        <div class="flex flex-row space-x-1 items-center">
          <p>{optionValue}</p>
          <button
            class="btn btn-primary btn-xs {optionValue === defaultOptionValue
              ? 'btn-disabled'
              : ''}"
            on:click={() => {
              if (optionValue === defaultOptionValue) return;
              defaultOptionValue = optionValue;
            }}
          >
            {optionValue === defaultOptionValue ? "Default" : "Set Default"}
          </button>
        </div>
      {/each}
    </div>
    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={addOptionToProduct}>
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
