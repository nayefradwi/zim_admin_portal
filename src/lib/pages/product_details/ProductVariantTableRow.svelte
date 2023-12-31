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
    navigate(getProductVariantDetailsRoute(variant.sku.toString()));
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
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        onUpdateVariantClicked(variant);
      },
    },
    {
      name: "Update Sku",
      icon: HashIcon,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        onUpdateSkuClicked(variant.sku);
      },
    },
    {
      name: variant.isArchived ? "Archive" : "Unarchive",
      icon: ArchiveIcon,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (variant.isArchived) onUnarchiveVariantClicked(variant);
        else onArchiveVariantClicked(variant);
      },
    },
    {
      name: "Delete",
      icon: Trash2Icon,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        onVariantDeleted(variant);
      },
    },
  ];
</script>

<tr class="hover" on:dblclick={goToVariant}>
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
