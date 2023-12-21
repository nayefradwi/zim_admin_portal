<script lang="ts">
  import ProductList from "./ProductList.svelte";
  import ProductSearchRow from "./ProductSearchRow.svelte";
  import CreateProductModel from "./CreateProductModel.svelte";
  import { productToggleStore } from "../../../stores/product_ingredient_toggle";
  let showProductCreationModal = false;
  function showProductCreation() {
    showProductCreationModal = true;
  }
</script>

<div class="overflow-x-auto overflow-y-auto m-4 flex flex-col">
  <CreateProductModel bind:showModal={showProductCreationModal} />
  <ProductSearchRow
    bind:isProducts={$productToggleStore}
    onClick={showProductCreation}
  />
  <ProductList bind:isProducts={$productToggleStore} />
</div>
