<script lang="ts">
  import {
    ProductRepo,
    type Product,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import ProductVariantTableRow from "./ProductVariantTableRow.svelte";
  import UpdateProductVariantSkuModel from "./UpdateProductVariantSkuModel.svelte";
  export let product: Product;
  export let productVariants: ProductVariant[];
  let showUpdateSkuModal: boolean = false;
  let currentSku: string = "";

  function onUpdateSku(sku: string) {
    currentSku = sku;
    showUpdateSkuModal = true;
  }

  function onUpdateSkuSuccessfully() {
    showUpdateSkuModal = false;
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
        <ProductVariantTableRow {variant} {onUpdateSku} />
      {/each}
    {/if}
  </tbody>
</table>
