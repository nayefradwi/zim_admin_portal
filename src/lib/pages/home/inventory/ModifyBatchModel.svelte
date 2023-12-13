<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    getResponse,
    ProductRepo,
    type Batch,
    type ModifyBatchRequest,
    type TransactionReason,
  } from "../../../../data/index";
  import { writable } from "svelte/store";
  import ModifyBatchTitle from "./ModifyBatchTitle.svelte";
  import { transactionReasonsStore } from "../../../stores/transaction";
  export let showModal: boolean;
  export let isIncrement: boolean = false;
  export let batch: Batch;
  export let onSuccessfulModify: () => void;

  $: if (dialog && showModal) dialog.showModal();
  let reasons: TransactionReason[];
  let selectedReason: TransactionReason | undefined;

  onMount(() => {
    reasons = $transactionReasonsStore.filter(
      (r) => r.isPositive == isIncrement
    );
    selectedReason = reasons[0];
  });
  const modifiedQty = writable(0);
  let newStock: number = batch.quantity;
  let isLoading: boolean = false;
  let dialog: HTMLDialogElement;
  let comment: string = "";
  let affectRecipe: boolean = true;

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
      call: () => {
        if (!affectRecipe) return ProductRepo.incrementBatch(data);
        return ProductRepo.incrementBatchWithRecipe(data);
      },
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
    if (!selectedReason) return;
    isLoading = true;
    let data: ModifyBatchRequest = {
      id: batch.id,
      quantity: $modifiedQty,
      unitId: batch.unit.id,
      sku: batch.sku,
      reason: selectedReason.name,
      comment: comment,
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
    <ModifyBatchTitle {batch} {isIncrement} bind:newStock></ModifyBatchTitle>
    {#if selectedReason}
      <select
        class="select select-bordered mx-2 my-2"
        tabindex="0"
        bind:value={selectedReason}
      >
        {#each reasons as reason}
          <option value={reason}>{reason.name}</option>
        {/each}
      </select>
    {/if}
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
    <textarea
      class="textarea textarea-bordered mx-2 my-2 fix resize-none textarea-lg"
      placeholder="Comment"
      maxlength={255}
      bind:value={comment}
    />
    {#if isIncrement}
      <label class="label cursor-pointer mx-2">
        <span class="label-text">Affect Recipe?</span>
        <input
          type="checkbox"
          checked={affectRecipe}
          class="checkbox checkbox-primary"
        />
      </label>
    {/if}

    <div class="modal-action">
      <button on:click={modify} class="btn btn-primary">
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

<style>
  textarea,
  select {
    width: 95%;
  }
</style>
