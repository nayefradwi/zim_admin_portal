<script lang="ts">
  import ProductsForm from "./ProductsForm.svelte";
  import RecipeForm from "./RecipeForm.svelte";

  export let resultVariantSku: string;
</script>

<main class="flex flex-col items-start p-4 space-y-1">
  <h1 class="text-xl font-semibold underline">
    Create Recipe for {resultVariantSku}
  </h1>
  <div class="divider"></div>
  <div class="my-2 h-2"></div>
  <div class="flex flex-row w-full justify-between">
    <ProductsForm />
    <div class="divider divider-horizontal space-y-2"></div>
    <RecipeForm />
  </div>
</main>
