<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    getResponse,
    ProductRepo,
    type Batch,
    type ModifyBatchRequest,
  } from "../../../../data/index";
  import { writable } from "svelte/store";
  export let showModal: boolean;
  export let isIncrement: boolean = false;
  export let batch: Batch;
  export let onSuccessfulModify: () => void;

  $: if (dialog && showModal) dialog.showModal();

  const modifiedQty = writable(0);
  let newStock: number = batch.quantity;
  let isLoading: boolean = false;
  let dialog: HTMLDialogElement;
  const unsubscribe = modifiedQty.subscribe((val) => {
    if (val < 0) return modifiedQty.set(0);
    if (isIncrement) return (newStock = batch.quantity + val);
    newStock = batch.quantity - val;
  });

  function onSuccess() {
    isLoading = false;
    showModal = false;
    dialog.close();
    onSuccessfulModify();
  }

  function increment(data: ModifyBatchRequest) {
    if (newStock < 0) return modifiedQty.set(0);
    getResponse<void>({
      call: () => ProductRepo.incrementBatch(data),
      onSuccess(_) {
        onSuccess();
      },
      onError(err) {
        isLoading = false;
      },
    });
  }

  function decrement(data: ModifyBatchRequest) {
    if (newStock < 0) return modifiedQty.set(0);
    getResponse<void>({
      call: () => ProductRepo.decrementBatch(data),
      onSuccess(_) {
        onSuccess();
      },
      onError(err) {
        isLoading = false;
      },
    });
  }

  function modify() {
    if (isLoading) return;
    isLoading = true;
    let data: ModifyBatchRequest = {
      id: batch.id,
      quantity: $modifiedQty,
      unitId: batch.unit.id,
      sku: batch.sku,
      reason: "sold",
    };
    if (isIncrement) return increment(data);
    return decrement(data);
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<dialog
  bind:this={dialog}
  on:close={() => {
    if (isLoading) return;
    $modifiedQty = 0;
    newStock = 0;
    showModal = false;
  }}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box">
    <div class="flex flex-col items-start justify-center">
      <h3 class="font-bold text-lg">
        {isIncrement ? "Increment Batch:" : "Decrement Batch:"}
        {batch.productName} / {batch.productVariant.name}
      </h3>
      <p class="py-4">
        Current stock: {newStock}{batch.unit ? batch.unit.symbol : ""}
      </p>
    </div>
    <div class="flex flex-row justify-between items-center">
      <input
        type="number"
        min="0"
        class="input input-bordered flex-grow mx-2"
        bind:value={$modifiedQty}
      />
      {#if batch.unit}
        <div>{batch.unit.symbol}</div>
      {/if}
    </div>
    <div class="modal-action">
      <button on:click={modify} class="btn btn-outline btn-primary">
        {#if isLoading}
          <span class="loading loading-spinner" />
        {/if}
        Confirm
      </button>
      <form method="dialog">
        <button class="btn {isLoading ? 'btn-disabled' : null}">Close</button>
      </form>
    </div>
  </div>
</dialog>
