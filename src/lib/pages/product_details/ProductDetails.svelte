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
  const details: ResponseHandlerData<Product> = {
    call: () => ProductRepo.getProduct(productId),
    onSuccess(data) {
      product = data;
    },
  };
  onMount(() => {
    getResponse<Product>(details);
  });

  function onArchiveClicked(): void {
    showArchiveDialog = true;
  }
</script>

<ApiConfirmationDialog
  title="Archive Product?"
  onConfirm={async () => {}}
  onCancel={() => {}}
  bind:showModal={showArchiveDialog}
></ApiConfirmationDialog>
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
