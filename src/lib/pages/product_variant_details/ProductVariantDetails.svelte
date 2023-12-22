<script lang="ts">
  import { onMount } from "svelte";
  import {
    ProductRepo,
    getResponse,
    type ProductVariant,
    type ResponseHandlerData,
  } from "../../../data";
  import toast from "svelte-french-toast";
  export let productVariantId: string;

  let isLoading: boolean = false;
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

<div>
  {#if isLoading}
    <div>Loading...</div>
  {:else if !productVariant}
    <div>Product variant not found</div>
  {:else}
    <div>{productVariant.name}</div>
  {/if}
</div>
