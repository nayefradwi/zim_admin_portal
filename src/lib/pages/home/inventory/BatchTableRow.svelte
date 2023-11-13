<script lang="ts">
    import type { DateTime } from "luxon";
    import type { Batch } from "../../../../data";
    import { parseDate, getDifferenceInDays } from "../../../utils/functions";
    import { EyeIcon, MinusIcon, PlusIcon } from "svelte-feather-icons";
    export let batchItem: Batch;
    const totalWorth = batchItem.productVariant.price * batchItem.quantity;
    let expiresAt: DateTime = parseDate(batchItem.expiresAt);
    let diffInDays = getDifferenceInDays(expiresAt);
</script>

<tr>
    {#if batchItem}
        <th>{batchItem.id}</th>
        <th>{batchItem.sku}</th>
        <th>{batchItem.productVariant.name}</th>
        <th>{totalWorth}QAR</th>
        {#if batchItem.unit}
            <th>{batchItem.quantity} {batchItem.unit.symbol}</th>
        {:else}
            <th>{batchItem.quantity}</th>
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
    {/if}
</tr>
