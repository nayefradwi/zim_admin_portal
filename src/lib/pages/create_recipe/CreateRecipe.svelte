<script lang="ts">
  import toast from "svelte-french-toast";
  import {
    RecipeRepo,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import AppNavBar from "../../components/AppNavBar.svelte";
  import LoadingDialog from "../../components/LoadingDialog.svelte";
  import {
    fromProductVariant,
    type AddRecipeVM,
    toCreateRecipeInputs,
  } from "../../view_models/addRecipeVM";
  import ProductsForm from "./ProductsForm.svelte";
  import RecipeForm from "./RecipeForm.svelte";

  export let resultVariantSku: string;
  let recipes: AddRecipeVM[] = [];
  let isLoading = false;

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

  function removeRecipe(recipe: AddRecipeVM) {
    recipes = recipes.filter(
      (r, _) => recipe.recipeVariantSku !== r.recipeVariantSku
    );
  }

  function createRecipe() {
    if (isLoading) return;
    if (recipes.length < 1) {
      toast.error("No recipe to create");
      return;
    }
    const details: ResponseHandlerData<void> = {
      call: () => {
        isLoading = true;
        const inputs = toCreateRecipeInputs(resultVariantSku, recipes);
        return RecipeRepo.createRecipe(inputs);
      },
      onSuccess: () => {
        isLoading = false;
        toast.success("Recipe created successfully");
        recipes = [];
      },
    };
    return getResponse<void>(details);
  }
</script>

<AppNavBar />
<main class="flex flex-col items-start p-4 space-y-1">
  <h1 class="text-xl font-semibold underline">
    Create Recipe for {resultVariantSku}
  </h1>
  <div class="my-2 h-2"></div>
  <div class="flex flex-row w-full justify-between">
    <ProductsForm onAddToRecipe={addProductVariantToRecipe} />
    <div class="divider divider-horizontal space-y-2"></div>
    <RecipeForm
      {recipes}
      onRecipeRemove={removeRecipe}
      onCreateRecipe={createRecipe}
    />
  </div>
</main>
<LoadingDialog bind:showModal={isLoading} />
