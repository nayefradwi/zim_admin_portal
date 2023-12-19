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
  export let batchId: string;
  let transactions: Transaction[] = [];
  let batch: Batch | undefined;
  let transactionStats: TransactionStats | undefined;
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
</script>

<div class="flex flex-col h-screen overflow-y-auto items-start p-4">
  {#if batch && transactionStats}
    <BatchTitle {batch}></BatchTitle>
    <div class="my-2" />
    <BatchStats {batch} {transactionStats} />
  {/if}
  <div class="text-xl font-semibold my-2">Transaction History</div>
  <TransactionsTable {transactions} />
</div>
