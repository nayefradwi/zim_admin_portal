<script lang="ts">
  import {
    ProductRepo,
    type Product,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import ProductVariantsTable from "./ProductVariantsTable.svelte";
  import AddProductVariantModel from "./AddProductVariantModel.svelte";
  import AddProductOptionValue from "./AddProductOptionValue.svelte";

  export let product: Product;
  export let productVariants: ProductVariant[];
  let showAddVariantModal: boolean = false;
  let showAddOptionValueModal: boolean = false;

  function onAddVariantSuccessfully() {
    showAddVariantModal = false;
    refreshProduct();
  }

  function onAddOptionValueSuccessfully() {
    showAddOptionValueModal = false;
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

<AddProductVariantModel
  onSuccessCallback={onAddVariantSuccessfully}
  bind:showModal={showAddVariantModal}
  {product}
/>
<AddProductOptionValue
  onSuccessCallback={onAddOptionValueSuccessfully}
  bind:showModal={showAddOptionValueModal}
  {product}
/>
<div class="h-full">
  <div class="divider flex flex-row my-1">
    <button
      class="btn btn-xs mx-1"
      on:click={() => {
        showAddVariantModal = true;
      }}>Add Variant</button
    >
    <!-- TODO add product option -->
    <button class="btn btn-xs mx-1">Add Product Option</button>
    <button
      class="btn btn-xs mx-1"
      on:click={() => {
        showAddOptionValueModal = true;
      }}>Add Option Value</button
    >
  </div>
  <div class="flex flex-col my-4 h-full">
    <ProductVariantsTable {productVariants} bind:product />
  </div>
</div>
