<script lang="ts">
  import {
    ProductRepo,
    type Product,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import ProductOptions from "./productOptions.svelte";
  import ProductDescription from "./ProductDescription.svelte";
  import ProductAppBar from "./ProductAppBar.svelte";
  import ProductVariantsView from "./ProductVariantsView.svelte";
  import { onMount } from "svelte";
  import ApiConfirmationDialog from "../../components/ApiConfirmationDialog.svelte";
  export let productId: string;
  let product: Product | undefined;
  let showArchiveDialog: boolean = false;
  let showUnarchiveDialog: boolean = false;

  function loadProduct(): void {
    const details: ResponseHandlerData<Product> = {
      call: () => ProductRepo.getProduct(productId),
      onSuccess(data) {
        product = data;
      },
    };
    getResponse<Product>(details);
  }

  onMount(loadProduct);

  function onArchiveClicked(): void {
    if (!product) return;
    if (product.isArchived) showUnarchiveDialog = true;
    else showArchiveDialog = true;
  }

  async function archiveProduct(): Promise<void> {
    const details: ResponseHandlerData<void> = {
      call: () => ProductRepo.archiveProduct(productId),
      onSuccess: loadProduct,
    };
    return getResponse<void>(details);
  }

  async function unarchiveProduct(): Promise<void> {
    const details: ResponseHandlerData<void> = {
      call: () => ProductRepo.unarchiveProduct(productId),
      onSuccess: loadProduct,
    };
    return getResponse<void>(details);
  }
</script>

<ApiConfirmationDialog
  title="Archive Product?"
  onConfirm={archiveProduct}
  onCancel={() => {}}
  bind:showModal={showArchiveDialog}
  message="Archiving this product will make it not visible in main product listing"
/>
<ApiConfirmationDialog
  title="Unarchive Product?"
  message="Unarchiving this product will make it visible in main product listing"
  onConfirm={unarchiveProduct}
  onCancel={() => {}}
  bind:showModal={showUnarchiveDialog}
/>
<main
  class="flex flex-col justify-start p-4 items-start h-screen overflow-y-auto
    bg-base-100"
>
  <div class="card w-full shadow rounded p-2 h-full bg-base-100">
    {#if product}
      <ProductAppBar
        name={product.name}
        isArchived={product.isArchived || false}
        {onArchiveClicked}
      />
      <ProductOptions productOptions={product.options} />
      <ProductDescription
        productDescription={product.description}
        productImage={product.image}
      />

      <ProductVariantsView
        bind:product
        productVariants={product.productVariants}
      />
    {:else}
      <span class="loading loading-spinner loading-lg text-primary m-auto" />
    {/if}
  </div>
</main>
