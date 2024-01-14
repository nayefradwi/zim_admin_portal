<script lang="ts">
  import type { Batch, TransactionStats } from "../../../data";
  import { transactionReasonsStore } from "../../stores/transaction";
  import { parseDate } from "../../utils/functions";
  import BatchStat from "./BatchStat.svelte";

  export let batch: Batch;
  export let transactionStats: TransactionStats;
  let price = (batch.productVariant.price * batch.quantity).toFixed(2);
  let isIngredientLabel = batch.isIngredient ? "Ingredient" : "Product";
  let isIngredientColor = batch.isIngredient
    ? "text-secondary"
    : "text-primary";

  function getTransactionStatByReason(reason: string): number {
    return transactionStats.ReasonStatsLookup[reason] || 0;
  }

  function getColorByReason(isPositive: boolean): string {
    return isPositive ? "text-success" : "text-error";
  }
</script>

<div class="flex flex-row flex-wrap">
  <BatchStat
    key="Current Quantity"
    value={`${batch.quantity} ${batch.unit.symbol}`}
  />
  <BatchStat
    key="Expires at"
    value={parseDate(batch.expiresAt).toLocaleString()}
  />
  <BatchStat key="Price" value={`${price} QR`} />
  <BatchStat key="Type" value={isIngredientLabel} color={isIngredientColor} />
  <BatchStat
    key="Positive Transactions"
    value={`${transactionStats.NumberOfNegativeTransactions} Transactions`}
  />
  <BatchStat
    key="Negative Transactions"
    value={`${transactionStats.NumberOfPositiveTransactions} Transactions`}
  />
  <BatchStat
    key="Total Transactions"
    value={`${transactionStats.NumberOfTransactions} Transactions`}
  />
  <BatchStat
    key="Positive sum"
    value={`${transactionStats.TotalNegativeSum} QR`}
  ></BatchStat>
  <BatchStat
    key="Negative sum"
    value={`${transactionStats.TotalPositiveSum} QR`}
  />
  {#each $transactionReasonsStore as reason}
    {#if getTransactionStatByReason(reason.name) > 0}
      <BatchStat
        key={reason.name}
        value={`${getTransactionStatByReason(reason.name)} ${
          batch.unit.symbol
        }`}
        color={getColorByReason(reason.isPositive)}
      />
    {/if}
  {/each}
</div>
