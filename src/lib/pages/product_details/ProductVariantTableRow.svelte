<script lang="ts">
    import type { ProductVariant } from "../../../data";
    import { EyeIcon, EditIcon, Trash2Icon } from "svelte-feather-icons";
    export let variant: ProductVariant;
</script>

<tr>
    <td>{variant.id}</td>
    <td>{variant.sku}</td>
    <td>{variant.name}</td>
    <td>{variant.price}</td>
    <td>
        {#if variant.isDefault}
            <button class="btn btn-xs btn-ghost text-secondary no-animation">
                default
            </button>
        {/if}

        <button
            class="m-0 p-0 btn btn-xs btn-ghost {variant.isArchived
                ? 'text-error'
                : 'text-success'} no-animation"
        >
            {variant.isArchived ? "archived" : "active"}
        </button>
    </td>
    <td>
        <button class="btn btn-xs btn-ghost">
            <!-- TODO view variant -->
            <EyeIcon />
        </button>
        <button class="btn btn-xs btn-ghost">
            <!-- TODO edit variant -->
            <EditIcon />
        </button>
        <button class="btn btn-xs btn-ghost text-error">
            <!-- TODO archive variant -->
            <Trash2Icon />
        </button>
    </td>
</tr>
