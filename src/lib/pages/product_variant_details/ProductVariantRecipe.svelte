<script lang="ts">
  import { navigate } from "svelte-routing";
  import {
    RecipeRepo,
    type ProductVariant,
    type ResponseHandlerData,
    getResponse,
  } from "../../../data";
  import RecipeListItem from "./RecipeListItem.svelte";
  import RecipeTitle from "./RecipeTitle.svelte";
  import { getCreateRecipeRoute } from "../../routes";
  import ApiConfirmationDialog from "../../components/ApiConfirmationDialog.svelte";
  import type { Recipe } from "../../../data/models/recipe";
  import toast from "svelte-french-toast";
  import AddRecipeModel from "./AddRecipeModel.svelte";
  import PrintRecipeModel from "./PrintRecipeModel.svelte";
  export let productVariant: ProductVariant;
  export let refreshVariantCB: () => void;
  let showDeleteDialog: boolean = false;
  let recipeToDelete: Recipe | undefined = undefined;
  let showAddRecipeDialog: boolean = false;
  let showPrintRecipeDialog: boolean = false;

  function goToCreateRecipe() {
    navigate(getCreateRecipeRoute(productVariant.sku));
  }

  function selectRecipeToDelete(recipe: Recipe) {
    recipeToDelete = recipe;
    showDeleteDialog = true;
  }

  async function confirmRecipeToDelete(): Promise<void> {
    if (!recipeToDelete) return;
    const details: ResponseHandlerData<void> = {
      call: () => RecipeRepo.deleteRecipe(recipeToDelete!.id.toString()),
      onSuccess: () => {
        refreshVariantCB();
        toast.success("Recipe removed successfully");
        recipeToDelete = undefined;
      },
    };
    return getResponse<void>(details);
  }

  function onCancelRecipeDelete(): void {
    recipeToDelete = undefined;
  }

  $: recipeToDeleteLabel = recipeToDelete
    ? `${recipeToDelete.productName} ${recipeToDelete.recipeVariantName}`
    : "";

  function onAddClicked() {
    showAddRecipeDialog = true;
  }

  function onPrintClicked() {
    showPrintRecipeDialog = true;
  }
</script>

<ApiConfirmationDialog
  bind:showModal={showDeleteDialog}
  title="Remove from Recipe?"
  message="Are you sure you want to remove {recipeToDeleteLabel} from this recipe?"
  onConfirm={confirmRecipeToDelete}
  onCancel={onCancelRecipeDelete}
/>
<AddRecipeModel
  bind:showModal={showAddRecipeDialog}
  resultVariantSku={productVariant.sku}
  onSuccessfulModify={refreshVariantCB}
/>
<PrintRecipeModel {productVariant} bind:showModal={showPrintRecipeDialog} />
<div class="card shadow bg-base-100 w-full p-4 overflow-y-auto">
  <div class="flex flex-row justify-between">
    <RecipeTitle {productVariant} {onAddClicked} {onPrintClicked} />
  </div>
  <div class="my-2" />
  {#if productVariant.recipes && productVariant.recipes.length > 0}
    <div class="flex flex-col space-y-1">
      {#each productVariant.recipes as item}
        <RecipeListItem recipe={item} onRemove={selectRecipeToDelete} />
      {/each}
    </div>
  {:else}
    <div class="text-gray-500">No recipe</div>
    <div class="my-2 flex-grow" />
    <button class="btn btn-primary" on:click={goToCreateRecipe}
      >Create recipe</button
    >
  {/if}
</div>

<style>
  .card {
    height: 65vh;
  }
</style>
