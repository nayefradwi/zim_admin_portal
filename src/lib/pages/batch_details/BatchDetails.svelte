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
  export let batchId: string;
  onMount(loadData);

  function loadData(): void {
    getTransactions();
    getBatch();
  }

  function getTransactions(): void {
    const details: ResponseHandlerData<Transaction[]> = {
      call: () => TransactionRepo.getTransactionsOfBatch(batchId),
      onSuccess(data) {
        console.log(data);
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
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    };
    getResponse<Batch>(details);
  }
</script>
