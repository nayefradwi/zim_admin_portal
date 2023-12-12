<script lang="ts">
  import type { DateTime } from "luxon";
  import type { Batch } from "../../../../data";
  import { parseDate, getDifferenceInDays } from "../../../utils/functions";
  import { EyeIcon, MinusIcon, PlusIcon } from "svelte-feather-icons";
  import type { MenuOptionItem } from "../../../view_models/menuOptionItem";
  import VerticalViewMore from "../../../components/VerticalViewMore.svelte";
  export let item: Batch | undefined;
  let expiresAt: DateTime;
  let diffInDays: number;
  let totalWorth: number;
  if (item) {
    totalWorth = item.productVariant.price * item.quantity;
    expiresAt = parseDate(item.expiresAt);
    diffInDays = getDifferenceInDays(expiresAt);
  }

  const batchOptions: MenuOptionItem[] = [
    {
      name: "View Details",
      icon: EyeIcon,
      onClick: () => {},
    },
    {
      name: "Increment Batch",
      icon: PlusIcon,
      onClick: () => {},
    },
    {
      name: "Decrement Batch",
      icon: MinusIcon,
      onClick: () => {},
    },
  ];
</script>

<tr class="hover">
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
      <VerticalViewMore position="dropdown-left" items={batchOptions} />
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
