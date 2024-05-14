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
  import { navigate } from "svelte-routing";
  import { PRODUCTS_ROUTE } from "../../routes";
  import { ingredientStore, productStore } from "../../stores/pagination";
  export let productId: string;
  let product: Product | undefined;
  let showDeleteProduct: boolean = false;

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

  function onDeleteClicked(): void {
    if (!product) return;
    showDeleteProduct = true;
  }

  async function deleteProduct(): Promise<void> {
    if (!product) return;
    const details: ResponseHandlerData<void> = {
      call: () => ProductRepo.deleteProduct(productId),
      onSuccess: (_) => {
        productStore.refresh($productStore);
        ingredientStore.refresh($ingredientStore);
        navigate(PRODUCTS_ROUTE);
      },
    };
    return getResponse<void>(details);
  }
</script>

<ApiConfirmationDialog
  title="Delete Product?"
  message="Deleting this product will delete all its variants, options, and batches. This action cannot be undone."
  onConfirm={deleteProduct}
  onCancel={() => {}}
  bind:showModal={showDeleteProduct}
/>

<main
  class="flex flex-col justify-start p-4 items-start h-screen overflow-y-auto
    bg-base-100"
>
  <div class="card w-full shadow rounded p-2 h-full bg-base-100">
    {#if product}
      <ProductAppBar name={product.name} {onDeleteClicked} />
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
