<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    getResponse,
    ProductRepo,
    type TransactionReason,
    type ProductVariant,
    type CreateBatchRequest,
  } from "../../../data/index";
  import { writable } from "svelte/store";
  import { transactionReasonsStore } from "../../stores/transaction";
  import toast from "svelte-french-toast";
  import CreateBatchTitle from "./CreateBatchTitle.svelte";
  export let showModal: boolean;
  export let variant: ProductVariant;
  export let onSuccessfulModify: () => void;

  $: if (dialog && showModal) dialog.showModal();
  let reasons: TransactionReason[];
  let selectedReason: TransactionReason | undefined;

  onMount(() => {
    reasons = $transactionReasonsStore.filter((r) => r.isPositive);
    selectedReason = reasons[0];
  });
  const modifiedQty = writable(0);
  let isLoading: boolean = false;
  let dialog: HTMLDialogElement;
  let comment: string = "";
  let affectRecipe: boolean = !variant.isIngredient;
  const unsubscribe = modifiedQty.subscribe((val) => {
    if (val < 0) return modifiedQty.set(0);
    modifiedQty.set(val);
  });

  function onSuccessCallback() {
    isLoading = false;
    showModal = false;
    dialog.close();
    toast.success("Batch created");
    onSuccessfulModify();
  }

  function increment(data: CreateBatchRequest) {
    if ($modifiedQty < 0) return modifiedQty.set(0);
    getResponse<void>({
      call: () => {
        if (!affectRecipe) return ProductRepo.createBatch(data);
        return ProductRepo.createBatchWithRecipe(data);
      },
      onSuccess(_) {
        onSuccessCallback();
      },
      onError(_) {
        isLoading = false;
        toast.error("Batch with the same expiry date already exists");
      },
    });
  }

  function modify() {
    if (isLoading) return;
    if (!selectedReason) return;
    if ($modifiedQty < 1) return;
    isLoading = true;
    let data: CreateBatchRequest = {
      quantity: $modifiedQty,
      unitId: variant.standardUnit!.id,
      sku: variant.sku,
      reason: selectedReason.name,
      comment: comment,
    };
    return increment(data);
  }

  function handleClose() {
    if (isLoading) return;
    $modifiedQty = 0;
    showModal = false;
    dialog.close();
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<dialog
  bind:this={dialog}
  on:close={handleClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box space-y-2">
    <CreateBatchTitle {variant} bind:newStock={$modifiedQty} />

    {#if selectedReason}
      <select class="select select-bordered w-full" bind:value={selectedReason}>
        {#each reasons as reason}
          <option value={reason}>{reason.name}</option>
        {/each}
      </select>
    {/if}

    <div class="flex flex-row items-center gap-2">
      <input
        type="number"
        min="0"
        class="input input-bordered flex-grow"
        bind:value={$modifiedQty}
      />
      {#if variant.standardUnit}
        <div class="unit-symbol">{variant.standardUnit.symbol}</div>
      {/if}
    </div>

    <textarea
      class="textarea textarea-bordered my-2 h-24 resize-none w-full"
      placeholder="Comment"
      maxlength="255"
      bind:value={comment}
    />

    {#if !variant.isIngredient}
      <label
        class="label cursor-pointer flex justify-between items-center mx-2"
      >
        <span class="label-text">Affect Recipe?</span>
        <input
          type="checkbox"
          bind:checked={affectRecipe}
          class="checkbox checkbox-primary"
        />
      </label>
    {/if}

    <div class="modal-action">
      <button on:click={modify} class="btn btn-primary" disabled={isLoading}>
        {#if isLoading}
          <span class="loading loading-spinner" />
        {:else}
          Confirm
        {/if}
      </button>
      <button type="button" class="btn" on:click={handleClose}>Close</button>
    </div>
  </div>
</dialog>

<style>
</style>
