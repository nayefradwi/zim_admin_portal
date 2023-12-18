<script lang="ts">
  import { onMount } from "svelte";
  import {
    type ResponseHandlerData,
    getResponse,
    type Transaction,
    TransactionRepo,
  } from "../../../data";
  export let batchId: string;
  onMount(loadData);

  function loadData(): void {
    getTransactions();
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
</script>
