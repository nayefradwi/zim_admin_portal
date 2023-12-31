<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  import {
    BATCH_DETAILS_ROUTE,
    CREATE_RECIPES_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_DETAILS_ROUTE,
    PRODUCT_VARIANT_DETAILS_ROUTE,
    WAREHOUSE_SELECT_ROUTE,
  } from "./lib/routes";
  import ProductDetails from "./lib/pages/product_details/ProductDetails.svelte";
  import BatchDetails from "./lib/pages/batch_details/BatchDetails.svelte";
  import { Toaster } from "svelte-french-toast";
  import ProductVariantDetails from "./lib/pages/product_variant_details/ProductVariantDetails.svelte";
  import CreateRecipe from "./lib/pages/create_recipe/CreateRecipe.svelte";

  export let url = "";
</script>

<main class="m-0 p-0 text-center h-screen">
  <Toaster position="top-right" />
  <Router {url}>
    <div>
      <Route path={HOME_ROUTE} component={Home} />
      <Route path={LOGIN_ROUTE} component={Login} />
      <Route path={WAREHOUSE_SELECT_ROUTE} component={WarehouseSelection} />
      <Route path={PRODUCT_DETAILS_ROUTE} let:params>
        <ProductDetails productId={params.id} />
      </Route>
      <Route path={BATCH_DETAILS_ROUTE} let:params>
        <BatchDetails batchId={params.id} />
      </Route>
      <Route path={PRODUCT_VARIANT_DETAILS_ROUTE} let:params>
        <ProductVariantDetails productVariantId={params.sku} />
      </Route>
      <Route path={CREATE_RECIPES_ROUTE} let:params>
        <CreateRecipe resultVariantSku={params.sku} />
      </Route>
      <Route path="*" component={Home} />
    </div>
  </Router>
</main>

<style>
  main {
    padding: 0;
  }
</style>
