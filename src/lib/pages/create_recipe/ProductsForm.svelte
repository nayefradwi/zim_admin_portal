<script lang="ts">
  import { HashIcon, SearchIcon } from "svelte-feather-icons";
  import ProductsFormClearButton from "./ProductsFormClearButton.svelte";
  import {
    ProductRepo,
    type PaginatedModel,
    type ProductVariant,
    type ResponseHandlerData,
    createSingleItemPage,
    getResponse,
  } from "../../../data";
  import toast from "svelte-french-toast";
  import SearchProductResultListing from "./SearchProductResultListing.svelte";
  let productVariantsPage: PaginatedModel<ProductVariant> | undefined =
    undefined;
  let isLoading: boolean = false;
  let sku = "";
  let name = "";

  function clearProducts(): void {
    if (isLoading) return;
    if (!productVariantsPage) return;
    if (!productVariantsPage.items) return;
    sku = "";
    name = "";
    productVariantsPage = undefined;
  }

  function getProductBySku() {
    if (!sku || sku.length < 1) {
      toast.error("Sku is required");
      return;
    }
    const details: ResponseHandlerData<ProductVariant> = {
      call: () => {
        isLoading = true;
        return ProductRepo.getProductVariantBySku(sku);
      },
      onSuccess: (data) => {
        isLoading = false;
        productVariantsPage = createSingleItemPage<ProductVariant>(data);
      },
    };
    return getResponse<ProductVariant>(details);
  }

  function searchProductsByName() {
    let searchQuery = name.trim();
    if (searchQuery.length < 1) {
      toast.error("Name is required");
      return;
    }
    const details: ResponseHandlerData<PaginatedModel<ProductVariant>> = {
      call: () => {
        isLoading = true;
        return ProductRepo.searchProductVariantByName(searchQuery);
      },
      onSuccess: (data) => {
        isLoading = false;
        productVariantsPage = data;
      },
    };
    return getResponse<PaginatedModel<ProductVariant>>(details);
  }
</script>

<div class="w-1/2 flex flex-col space-y-2">
  <h2 class="font-medium">Products</h2>
  <div class="flex flex-row space-x-2">
    <input
      bind:value={name}
      class="input input-bordered input-sm flex-grow"
      placeholder="Search by name"
    />
    <button class="icon-btn" on:click={searchProductsByName}>
      <SearchIcon />
    </button>
    <ProductsFormClearButton onClick={clearProducts} />
  </div>
  <div class="flex flex-row space-x-2">
    <input
      bind:value={sku}
      class="input input-bordered input-sm flex-grow"
      placeholder="Get by sku / barcode"
    />
    <button class="icon-btn" on:click={getProductBySku}>
      <HashIcon />
    </button>
    <ProductsFormClearButton onClick={clearProducts} />
  </div>
  <div>
    {#if isLoading}
      <div class="loading loading-spinner"></div>
    {:else if !productVariantsPage || !productVariantsPage.items}
      <p class="text-base-300 font-light">no products found</p>
    {:else}
      <SearchProductResultListing productVariants={productVariantsPage.items} />
    {/if}
  </div>
</div>
