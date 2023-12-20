<script lang="ts">
  import { onMount } from "svelte";
  import {
    type ResponseHandlerData,
    getResponse,
    type Transaction,
    TransactionRepo,
    ProductRepo,
    type Batch,
    type TransactionStats,
    getTransactionStats as getTransactionStatsFromTransactions,
  } from "../../../data";
  import BatchStats from "./BatchStats.svelte";
  import BatchTitle from "./BatchTitle.svelte";
  import TransactionsTable from "../../components/TransactionsTable.svelte";
  import { MinusIcon, PlusIcon } from "svelte-feather-icons";
  import ModifyBatchModel from "../home/inventory/ModifyBatchModel.svelte";
  import {
    addErrorNotification,
    addNotification,
  } from "../../stores/notification";
  export let batchId: string;
  let transactions: Transaction[] = [];
  let batch: Batch | undefined;
  let transactionStats: TransactionStats | undefined;
  let showIncrementModal: boolean = false;
  let showDecrementModal: boolean = false;
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
        transactionStats = getTransactionStatsFromTransactions(transactions);
        addNotification("Loaded transactions");
      },
      onError(error) {
        addErrorNotification(error.message);
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

  function showIncrement() {
    showIncrementModal = true;
  }

  function showDecrement() {
    showDecrementModal = true;
  }
</script>

<div class="flex flex-col h-screen overflow-y-auto items-start p-4">
  {#if batch && transactionStats}
    <ModifyBatchModel
      {batch}
      bind:showModal={showIncrementModal}
      isIncrement={true}
      onSuccessfulModify={() => {
        loadData();
      }}
    />
    <ModifyBatchModel
      {batch}
      bind:showModal={showDecrementModal}
      isIncrement={false}
      onSuccessfulModify={() => {
        loadData();
      }}
    />
    <BatchTitle {batch}></BatchTitle>
    <div class="my-2" />
    <BatchStats {batch} {transactionStats} />
    <div class="flex flex-row items-center">
      <div class="text-xl font-semibold m-2">Transaction History</div>
      <button
        on:click={showIncrement}
        class="mx-2 btn btn-circle btn-outline btn-success btn-sm no-animation"
        ><PlusIcon></PlusIcon></button
      >
      <button
        on:click={showDecrement}
        class="mx-2 btn btn-circle btn-outline btn-error btn-sm no-animation"
        ><MinusIcon></MinusIcon></button
      >
    </div>
    <TransactionsTable {transactions} />
  {/if}
</div>
