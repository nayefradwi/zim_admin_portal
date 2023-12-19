<script lang="ts">
  import { onMount } from "svelte";
  import {
    type ResponseHandlerData,
    getResponse,
    type Transaction,
    TransactionRepo,
    ProductRepo,
    type Batch,
  } from "../../../data";
  import { ArrowLeftIcon } from "svelte-feather-icons";
  import { navigate } from "svelte-routing";
  import { HOME_ROUTE } from "../../routes";
  export let batchId: string;
  let transactions: Transaction[] = [];
  let batch: Batch | undefined;
  onMount(loadData);

  function loadData(): void {
    getTransactions();
    getBatch();
  }

  function getTransactions(): void {
    const details: ResponseHandlerData<Transaction[]> = {
      call: () => TransactionRepo.getTransactionsOfBatch(batchId),
      onSuccess(data) {
        transactions = data;
      },
      onError(error) {
        console.log(error);
      },
    };
    getResponse<Transaction[]>(details);
  }

  function getBatch(): void {
    const details: ResponseHandlerData<Batch> = {
      call: () => ProductRepo.getBatchById(batchId),
      onSuccess(data) {
        batch = data;
      },
      onError(error) {
        console.log(error);
      },
    };
    getResponse<Batch>(details);
  }

  function goToHome() {
    navigate(HOME_ROUTE);
  }
</script>

<div class="flex flex-col h-screen overflow-y-auto items-start p-4">
  {#if batch}
    <div class="flex flex-row items-end">
      <button on:click={goToHome}>
        <ArrowLeftIcon></ArrowLeftIcon>
      </button>
      <span class="mx-1" />
      <h1 class="text-2xl font-semibold underline">
        {batch.productName} / {batch.productVariant.name} / {batch.sku}
      </h1>
    </div>
    <div class="self-center">
      <h2 class="text-xl font-semibold">{batch.id}</h2>
    </div>
  {/if}
</div>
