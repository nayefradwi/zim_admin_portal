<script lang="ts">
  import toast from "svelte-french-toast";
  import {
    ProductRepo,
    type PaginatedModel,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
    createSingleItemPage,
    type CreateRecipeInput,
    RecipeRepo,
  } from "../../../data";
  import { HashIcon, SearchIcon } from "svelte-feather-icons";
  import ProductsFormClearButton from "../create_recipe/ProductsFormClearButton.svelte";
  import SearchProductResultListing from "../create_recipe/SearchProductResultListing.svelte";
  import { enforceNumber } from "../../utils/functions";
  export let showModal: boolean;
  export let resultVariantSku: string;
  export let onSuccessfulModify: () => void;

  let productVariant: ProductVariant | undefined;
  let dialog: HTMLDialogElement;
  let qty: number = 1;
  let isLoading: boolean = false;
  let isAdding: boolean = false;
  let name: string = "";
  let sku: string = "";
  let variantsPage: PaginatedModel<ProductVariant> | undefined = undefined;

  function onClose() {
    if (isLoading) return;
    sku = "";
    name = "";
    variantsPage = undefined;
    showModal = false;
    productVariant = undefined;
    isLoading = false;
    isAdding = false;
    qty = 1;
    dialog.close();
  }

  $: if (dialog && showModal) dialog.showModal();

  function getProductBySku() {
    if (!sku || sku.length < 1) {
      toast.error("Sku is required");
      return;
    }
    name = "";
    productVariant = undefined;
    const details: ResponseHandlerData<ProductVariant> = {
      call: () => {
        isLoading = true;
        return ProductRepo.getProductVariantBySku(sku);
      },
      onSuccess: (data) => {
        isLoading = false;
        variantsPage = createSingleItemPage<ProductVariant>(data);
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
    sku = "";
    productVariant = undefined;
    const details: ResponseHandlerData<PaginatedModel<ProductVariant>> = {
      call: () => {
        isLoading = true;
        return ProductRepo.searchProductVariantByName(searchQuery);
      },
      onSuccess: (data) => {
        isLoading = false;
        variantsPage = data;
      },
    };
    return getResponse<PaginatedModel<ProductVariant>>(details);
  }

  function _onEnterClickedForSku(event: KeyboardEvent) {
    if (event.key === "Enter") {
      getProductBySku();
    }
  }

  function _onEnterClickedForName(event: KeyboardEvent) {
    if (event.key === "Enter") {
      searchProductsByName();
    }
  }

  function clearProducts(): void {
    if (isLoading) return;
    if (isAdding) return;
    if (!variantsPage) return;
    if (!variantsPage.items) return;
    sku = "";
    name = "";
    variantsPage = undefined;
    productVariant = undefined;
  }

  function selectVariant(variant: ProductVariant): void {
    productVariant = variant;
  }

  function addRecipe() {
    if (isLoading) return;
    if (isAdding) return;
    if (qty <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    if (!productVariant) {
      toast.error("Select a product variant");
      return;
    }
    if (resultVariantSku == productVariant.sku) {
      toast.error("Cannot add recipe to itself");
      return;
    }
    const details: ResponseHandlerData<void> = {
      call: () => {
        isAdding = true;
        const input: CreateRecipeInput = {
          resultVariantSku: resultVariantSku,
          recipeVariantSku: productVariant!.sku,
          quantity: qty,
          unitId: productVariant!.standardUnit!.id,
        };
        return RecipeRepo.addRecipe(input);
      },
      onSuccess: (_) => {
        toast.success("Recipe added successfully");
        onClose();
        onSuccessfulModify();
      },
    };
    return getResponse<void>(details);
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box space-y-2">
    <div class="flex flex-row space-x-2">
      <input
        on:keydown={_onEnterClickedForName}
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
        on:keydown={_onEnterClickedForSku}
        bind:value={sku}
        class="input input-bordered input-sm flex-grow"
        placeholder="Get by sku / barcode"
      />
      <button class="icon-btn" on:click={getProductBySku}>
        <HashIcon />
      </button>
      <ProductsFormClearButton onClick={clearProducts} />
    </div>
    <div class="flex flex-row space-x-2">
      <input
        type="number"
        placeholder="Quantity: x {productVariant?.standardUnit?.name}"
        class="input input-bordered input-sm w-full"
        min="1"
        on:input={(e) => enforceNumber(e, true)}
        bind:value={qty}
      />
      <p>
        {productVariant?.standardUnit?.name ?? "x"}
      </p>
    </div>
    {#if productVariant}
      <div class="flex flex-row justify-start">
        {productVariant.productName}
        {productVariant.name}
      </div>
      <div class="modal-action">
        <button class="btn btn-primary" on:click={addRecipe}>
          {#if isLoading}
            <span class="loading loading-spinner" />
          {:else}
            Add
          {/if}
        </button>
        <button class="btn" on:click={onClose}> Cancel </button>
      </div>
    {:else if isLoading}
      <div class="loading loading-spinner" />
    {:else if variantsPage && variantsPage.items && variantsPage.items.length > 0}
      <SearchProductResultListing
        onProductVariantSelected={selectVariant}
        productVariants={variantsPage.items}
      />
    {:else}
      <div class="text-gray-500">No products found</div>
    {/if}
  </div>
</dialog>
