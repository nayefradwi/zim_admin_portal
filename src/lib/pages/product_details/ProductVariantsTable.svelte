<script lang="ts">
  import {
    ProductRepo,
    type Product,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import ProductVariantTableRow from "./ProductVariantTableRow.svelte";
  import UpdateProductVariantDetails from "./UpdateProductVariantDetails.svelte";
  import UpdateProductVariantSkuModel from "./UpdateProductVariantSkuModel.svelte";
  export let product: Product;
  export let productVariants: ProductVariant[];
  let showUpdateSkuModal: boolean = false;
  let showUpdateVariantModal: boolean = false;
  let currentSku: string = "";
  let currentVariant: ProductVariant | undefined = undefined;
  function onUpdateSkuClicked(sku: string) {
    currentSku = sku;
    showUpdateSkuModal = true;
  }

  function onUpdateVariantClicked(variant: ProductVariant) {
    currentVariant = variant;
    showUpdateVariantModal = true;
  }

  function onUpdateSkuSuccessfully() {
    showUpdateSkuModal = false;
    refreshProduct();
  }

  function onUpdateVariantSuccessfully() {
    showUpdateVariantModal = false;
    refreshProduct();
  }

  function refreshProduct() {
    const details: ResponseHandlerData<Product> = {
      call: () => ProductRepo.getProduct(product.id.toString()),
      onSuccess(data) {
        product = data;
      },
    };
    getResponse<Product>(details);
  }
</script>

<UpdateProductVariantSkuModel
  bind:showModal={showUpdateSkuModal}
  onSuccessCallback={onUpdateSkuSuccessfully}
  bind:currentSku
/>
<UpdateProductVariantDetails
  bind:showModal={showUpdateVariantModal}
  onSuccessCallback={onUpdateVariantSuccessfully}
  bind:productVariant={currentVariant}
/>
<table class="table table-xs">
  <thead>
    <tr>
      <th>Id</th>
      <th>Sku</th>
      <th>Name</th>
      <th>Price</th>
      <th>Details</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#if productVariants && productVariants.length > 0}
      {#each productVariants as variant}
        <ProductVariantTableRow
          {variant}
          {onUpdateSkuClicked}
          {onUpdateVariantClicked}
        />
      {/each}
    {/if}
  </tbody>
</table>
