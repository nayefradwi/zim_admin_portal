<script lang="ts">
  import type { Product } from "../../../../data";
  import TablePaginationButtons from "../../../components/TablePaginationButtons.svelte";
  import { ingredientStore, productStore } from "../../../stores/pagination";
  import ProductListItem from "./ProductListItem.svelte";
  import ProductLoading from "./ProductLoading.svelte";
  import ProductOrIngredientView from "./ProductOrIngredientView.svelte";
  export let isProducts: boolean;

  function nextProduct() {
    productStore.getNext($productStore);
  }

  function prevProduct() {
    productStore.getPrevious($productStore);
  }

  function nextIngredient() {
    ingredientStore.getNext($ingredientStore);
  }

  function prevIngredient() {
    ingredientStore.getPrevious($ingredientStore);
  }
</script>

{#if isProducts}
  <ProductOrIngredientView
    state={$productStore}
    next={nextProduct}
    prev={prevProduct}
  />
{:else}
  <ProductOrIngredientView
    state={$ingredientStore}
    next={nextIngredient}
    prev={prevIngredient}
  />
{/if}
