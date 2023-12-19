<script lang="ts">
  import { type Transaction } from "../../data";

  export let transactions: Transaction[];
</script>

<table class="table mx-2">
  <thead>
    <tr>
      <th>Id</th>
      <th>Sku</th>
      <th>Reason</th>
      <th>Is Positive?</th>
      <th>Quantity</th>
      <th>Unit</th>
      <th>Price</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody>
    {#each transactions as transaction}
      <tr class="hover">
        <td>{transaction.id}</td>
        <td>{transaction.sku}</td>
        <td>{transaction.reason.name}</td>
        <td>{transaction.reason.isPositive ? "Yes" : "No"}</td>
        <td>{transaction.quantity}</td>
        <td>{transaction.unit.name}</td>
        <td>{transaction.amount} QR</td>
        <td>{transaction.createdAt}</td>
      </tr>
    {/each}
  </tbody>
</table>
