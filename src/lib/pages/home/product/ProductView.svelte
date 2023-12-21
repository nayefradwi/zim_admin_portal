<script lang="ts">
  import ProductList from "./ProductList.svelte";
  import ProductSearchRow from "./ProductSearchRow.svelte";
  import CreateProductModel from "./CreateProductModel.svelte";
  import { productStore } from "../../../stores/pagination";
  let isProducts = true;
  let showProductCreationModal = false;

  function showProductCreation() {
    showProductCreationModal = true;
  }

  function onSuccessfulCreation() {
    showProductCreationModal = false;
    productStore.refresh($productStore);
  }
</script>

<div class="overflow-x-auto overflow-y-auto m-4 flex flex-col">
  <CreateProductModel
    bind:showModal={showProductCreationModal}
    {onSuccessfulCreation}
  />
  <ProductSearchRow bind:isProducts onClick={showProductCreation} />
  <ProductList bind:isProducts />
</div>
