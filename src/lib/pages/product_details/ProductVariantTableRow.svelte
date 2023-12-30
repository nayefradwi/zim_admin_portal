<script lang="ts">
  import type { ProductVariant } from "../../../data";
  import {
    EyeIcon,
    EditIcon,
    Trash2Icon,
    ArchiveIcon,
    HashIcon,
  } from "svelte-feather-icons";
  import type { MenuOptionItem } from "../../view_models/menuOptionItem";
  import VerticalViewMore from "../../components/VerticalViewMore.svelte";
  import { navigate } from "svelte-routing";
  import { getProductVariantDetailsRoute } from "../../routes";
  export let variant: ProductVariant;
  export let onUpdateSkuClicked: (sku: string) => void;
  export let onUpdateVariantClicked: (variant: ProductVariant) => void;
  export let onArchiveVariantClicked: (variant: ProductVariant) => void;
  export let onUnarchiveVariantClicked: (variant: ProductVariant) => void;
  export let onVariantDeleted: (variant: ProductVariant) => void;

  function goToVariant() {
    navigate(getProductVariantDetailsRoute(variant.id.toString()));
  }
  const variantOptions: MenuOptionItem[] = [
    {
      name: "View Details",
      icon: EyeIcon,
      onClick: () => {
        goToVariant();
      },
    },
    {
      name: "Edit Details",
      icon: EditIcon,
      onClick: () => onUpdateVariantClicked(variant),
    },
    {
      name: "Update Sku",
      icon: HashIcon,
      onClick: () => onUpdateSkuClicked(variant.sku),
    },
    {
      name: variant.isArchived ? "Archive" : "Unarchive",
      icon: ArchiveIcon,
      onClick: () => {
        if (variant.isArchived) onUnarchiveVariantClicked(variant);
        else onArchiveVariantClicked(variant);
      },
    },
    {
      name: "Delete",
      icon: Trash2Icon,
      onClick: () => {
        onVariantDeleted(variant);
      },
    },
  ];
</script>

<tr class="hover" on:click={goToVariant}>
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
    <VerticalViewMore items={variantOptions} position="dropdown-left" />
  </td>
</tr>
