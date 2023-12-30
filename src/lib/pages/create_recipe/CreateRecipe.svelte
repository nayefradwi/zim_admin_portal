<script lang="ts">
  import type { ProductVariant } from "../../../data";
  import AppNavBar from "../../components/AppNavBar.svelte";
  import {
    fromProductVariant,
    type AddRecipeVM,
  } from "../../view_models/addRecipeVM";
  import ProductsForm from "./ProductsForm.svelte";
  import RecipeForm from "./RecipeForm.svelte";

  export let resultVariantSku: string;
  let recipes: AddRecipeVM[] = [];

  function addProductVariantToRecipe(
    variant: ProductVariant,
    quantity: number
  ) {
    let recipeIndex = recipes.findIndex(
      (r) => r.recipeVariantSku === variant.sku
    );
    if (recipeIndex >= 0) {
      recipes[recipeIndex].quantity += quantity;
      recipes = [...recipes];
    } else {
      _addNewProductVariant(variant, quantity);
    }
  }

  function _addNewProductVariant(variant: ProductVariant, quantity: number) {
    const addVm = fromProductVariant(variant, quantity);
    if (!addVm) return;
    recipes = [...recipes, addVm];
  }
</script>

<AppNavBar />
<main class="flex flex-col items-start p-4 space-y-1">
  <h1 class="text-xl font-semibold underline">
    Create Recipe for {resultVariantSku}
  </h1>
  <div class="divider"></div>
  <div class="my-2 h-2"></div>
  <div class="flex flex-row w-full justify-between">
    <ProductsForm />
    <div class="divider divider-horizontal space-y-2"></div>
    <RecipeForm {recipes} />
  </div>
</main>
