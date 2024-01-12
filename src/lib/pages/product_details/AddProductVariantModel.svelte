<script lang="ts">
  import toast from "svelte-french-toast";

  import { enforceNumber } from "../../utils/functions";
  import { unitStore } from "../../stores/unit";
  import {
    getResponse,
    ProductRepo,
    type Product,
    type ProductOptionValue,
    type ResponseHandlerData,
  } from "../../../data";

  export let showModal: boolean;
  export let product: Product;
  export let onSuccessCallback: () => void;
  let dialog: HTMLDialogElement;
  let selectOptions: Record<string, HTMLSelectElement> = {};
  $: if (dialog && showModal) dialog.showModal();
  $: options = Object.keys(product.options ?? {});
  let isLoading: boolean = false;

  let sku: string | undefined;
  let price: number | undefined;
  let widthInCm: number | undefined;
  let heightInCm: number | undefined;
  let depthInCm: number | undefined;
  let weightInG: number | undefined;
  let standardUnitId: number | undefined;
  let expiresInDays: number | undefined;

  function getProductOptionValues(key: string): ProductOptionValue[] {
    if (!product.options) return [];
    return product.options[key].values;
  }

  function getSelectOptionsValues(): number[] {
    return Object.values(selectOptions)
      .map((select) => {
        try {
          return parseInt(select.value);
        } catch (e) {
          return 0;
        }
      })
      .filter((value) => value > 0);
  }
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
    if (getSelectOptionsValues().length !== options.length) {
      toast.error("All options are required");
      return false;
    }
    return true;
  }

  function addProductVariant() {
    if (!isValid()) return;
    const details: ResponseHandlerData<void> = {
      call: () => {
        isLoading = true;
        return ProductRepo.addProductVariant({
          productVariant: {
            id: 0,
            name: "",
            productId: product.id,
            sku: sku!,
            price: price!,
            width: widthInCm,
            height: heightInCm,
            depth: depthInCm,
            weight: weightInG,
            standardUnitId: standardUnitId!,
            expiresInDays: expiresInDays!,
          },
          optionsValueIds: getSelectOptionsValues(),
        });
      },
      onSuccess(_) {
        isLoading = false;
        onSuccessCallback();
        onClose();
      },
      onError(e) {
        isLoading = false;
        toast.error(e.message);
      },
    };
    return getResponse<void>(details);
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
      <input
        placeholder="Sku"
        class="input input-bordered input-sm flex flex-row w-full"
        bind:value={sku}
      />

      <input
        placeholder="Expires in days"
        class="input input-bordered input-sm flex flex-row w-full"
        min="1"
        type="number"
        bind:value={expiresInDays}
        on:input={(e) => enforceNumber(e)}
      />

      <select
        bind:value={standardUnitId}
        class="select select-bordered w-full select-sm"
      >
        {#each $unitStore as unit}
          <option value={unit.id}>{unit.name}</option>
        {/each}
      </select>

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
      {#each options as option}
        <div class="input-group">
          <span class="input-label">{option}</span>
          <select
            bind:this={selectOptions[option]}
            class="select select-bordered w-full select-sm"
            value={undefined}
          >
            {#each getProductOptionValues(option) as value}
              <option value={value.id}>{value.value}</option>
            {/each}
          </select>
        </div>
      {/each}
    </div>

    <div class="modal-action mt-6">
      <button class="btn btn-primary" on:click={addProductVariant}>
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

  .input-group .select {
    width: 90%;
    margin-left: 4px;
  }

  .input-group span {
    width: 10%;
    margin-left: 4px;
  }
</style>
