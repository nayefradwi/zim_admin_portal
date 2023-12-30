<script lang="ts">
  import { onMount } from "svelte";
  import {
    ProductRepo,
    getResponse,
    type ProductVariant,
    type ResponseHandlerData,
  } from "../../../data";
  import toast from "svelte-french-toast";
  import ProductVariantTitle from "./ProductVariantTitle.svelte";
  import ProductVariantDetailsRow from "./ProductVariantDetailsRow.svelte";
  import ProductVariantBatches from "./ProductVariantBatches.svelte";
  import ProductVariantRecipe from "./ProductVariantRecipe.svelte";
  import CreateBatchModel from "./CreateBatchModel.svelte";
  import AppNavBar from "../../components/AppNavBar.svelte";
  export let productVariantId: string;
  let isLoading: boolean = false;
  let showCreateBatchModal: boolean = false;
  let productVariant: ProductVariant | undefined = undefined;
  function loadProductVariantDetails() {
    isLoading = true;
    const details: ResponseHandlerData<ProductVariant> = {
      call: () => ProductRepo.getProductVariantById(productVariantId),
      onSuccess: (data) => {
        isLoading = false;
        productVariant = data;
      },
      onError: (error) => {
        toast.error(error.message);
      },
    };
    getResponse<ProductVariant>(details);
  }

  onMount(() => {
    loadProductVariantDetails();
  });
</script>

<AppNavBar />
<div class="flex flex-col items-start p-4">
  {#if isLoading}
    <div>Loading...</div>
  {:else if !productVariant}
    <div>Product variant not found</div>
  {:else}
    <CreateBatchModel
      onSuccessfulModify={loadProductVariantDetails}
      bind:showModal={showCreateBatchModal}
      variant={productVariant}
    />
    <ProductVariantTitle variant={productVariant} />
    <div class="my-2" />
    <div class="flex flex-row w-full space-x-4">
      <div class="flex flex-col w-1/2 items-start space-y-4">
        <ProductVariantDetailsRow {productVariant} />
        <ProductVariantRecipe {productVariant} />
      </div>
      <div class="flex flex-col w-1/2 items-start space-y-4">
        <div class="card shadow bg-base-100 w-full p-4">
          <div class="flex flex-row justify-between">
            <h1 class="text-xl font-medium">Batches closest to expire</h1>
            <button
              class="btn btn-primary btn-sm"
              on:click={() => (showCreateBatchModal = true)}
            >
              Create Batch
            </button>
          </div>
          <ProductVariantBatches {productVariant} />
        </div>
      </div>
    </div>
  {/if}
</div>
