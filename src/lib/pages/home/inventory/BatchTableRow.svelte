<script lang="ts">
  import type { DateTime } from "luxon";
  import type { Batch } from "../../../../data";
  import { parseDate, getDifferenceInDays } from "../../../utils/functions";
  import { EyeIcon, MinusIcon, PlusIcon } from "svelte-feather-icons";
  export let item: Batch | undefined;
  let expiresAt: DateTime;
  let diffInDays: number;
  let totalWorth: number;
  if (item) {
    totalWorth = item.productVariant.price * item.quantity;
    expiresAt = parseDate(item.expiresAt);
    diffInDays = getDifferenceInDays(expiresAt);
  }
</script>

<tr>
  {#if item}
    <th>{item.id}</th>
    <th>{item.sku}</th>
    <th>{item.productName}</th>
    <th>{item.productVariant.name}</th>
    <th>{totalWorth}QAR</th>
    {#if item.unit}
      <th>{item.quantity} {item.unit.symbol}</th>
    {:else}
      <th>{item.quantity}</th>
    {/if}
    <th class={diffInDays < 15 ? "text-error" : null}
      >{expiresAt.toLocaleString()}</th
    >
    <td>
      <button class="btn btn-ghost no-animation btn-xs p-0 m-0">
        <!-- TODO increment batch -->
        <PlusIcon />
      </button>
      <button class="btn btn-ghost no-animation btn-xs p-0 m-0">
        <!-- TODO view variant -->
        <EyeIcon />
      </button>

      <button class="btn btn-ghost no-animation btn-xs p-0 m-0">
        <!-- TODO decrement batch -->
        <MinusIcon />
      </button>
    </td>
  {:else}
    <th>-</th>
    <th />
    <th />
    <th />
    <th />
    <th />
    <th />
    <th />
  {/if}
</tr>
