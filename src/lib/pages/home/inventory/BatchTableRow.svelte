<script lang="ts">
  import type { DateTime } from "luxon";
  import type { Batch } from "../../../../data";
  import { parseDate, getDifferenceInDays } from "../../../utils/functions";
  import { EyeIcon, MinusIcon, PlusIcon } from "svelte-feather-icons";
  import type { MenuOptionItem } from "../../../view_models/menuOptionItem";
  import VerticalViewMore from "../../../components/VerticalViewMore.svelte";
  import ModifyBatchModel from "./ModifyBatchModel.svelte";
  import { batchStore } from "../../../stores/pagination";
  import { navigate } from "svelte-routing";
  export let item: Batch | undefined;
  export let onSuccessfulModify: () => void;
  let expiresAt: DateTime;
  let diffInDays: number;
  let totalWorth: number;
  let showIncrementModal: boolean = false;
  let showDecrementModal: boolean = false;

  if (item) {
    totalWorth = item.productVariant.price * item.quantity;
    expiresAt = parseDate(item.expiresAt);
    diffInDays = getDifferenceInDays(expiresAt);
  }

  function goToBatchDetails() {
    if (!item) return;
    navigate(`/batches/${item.id}`);
  }
  const batchOptions: MenuOptionItem[] = [
    {
      name: "View Details",
      icon: EyeIcon,
      onClick: () => {
        goToBatchDetails();
      },
    },
    {
      name: "Increment Batch",
      icon: PlusIcon,
      onClick: () => {
        showIncrementModal = true;
      },
    },
    {
      name: "Decrement Batch",
      icon: MinusIcon,
      onClick: () => {
        showDecrementModal = true;
      },
    },
  ];
</script>

<tr class="hover" on:click={goToBatchDetails}>
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
    <ModifyBatchModel
      batch={item}
      bind:showModal={showIncrementModal}
      isIncrement={true}
      {onSuccessfulModify}
    />
    <ModifyBatchModel
      batch={item}
      bind:showModal={showDecrementModal}
      isIncrement={false}
      {onSuccessfulModify}
    />
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
