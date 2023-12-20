<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  import {
    getTokensFromSession,
    setAuthHeader,
    setWarehouseHeader,
    type Batch,
    type Product,
  } from "./data";
  import { userStore } from "./lib/stores/user";
  import {
    BATCH_DETAILS_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_DETAILS_ROUTE,
    WAREHOUSE_SELECT_ROUTE,
  } from "./lib/routes";
  import { getWarehouseSelected } from "./data/local_storage";
  import { warehouseStore } from "./lib/stores/warehouse";
  import ProductDetails from "./lib/pages/product_details/ProductDetails.svelte";
  import {
    batchStore,
    productStore,
    type PaginationState,
    ingredientStore,
  } from "./lib/stores/pagination";
  import { transactionReasonsStore } from "./lib/stores/transaction";
  import BatchDetails from "./lib/pages/batch_details/BatchDetails.svelte";
  import NotificationWrapper from "./lib/components/NotificationWrapper.svelte";

  onMount(async () => {
    const token = getTokensFromSession();
    if (!token) return navigate(LOGIN_ROUTE);
    setAuthHeader(token.accessToken);
    await userStore.getUser();
    if (!$userStore) return navigate(LOGIN_ROUTE);
    console.log("user", $userStore.firstName);
    const warehouseId = getWarehouseSelected();
    if (!warehouseId) navigate(WAREHOUSE_SELECT_ROUTE);
    setWarehouseHeader(warehouseId);
    await warehouseStore.getCurrentWarehouse();
    if (!$warehouseStore) navigate(WAREHOUSE_SELECT_ROUTE);
    loadData();
  });

  function loadData() {
    let emptyBatchState: PaginationState<Batch> = {
      pageNumber: 1,
      isLoading: false,
      page: null,
    };
    batchStore.refresh(emptyBatchState);
    let emptyProductState: PaginationState<Product> = {
      pageNumber: 1,
      isLoading: false,
      page: null,
    };
    productStore.refresh(emptyProductState);
    let emptyIngredientState: PaginationState<Product> = {
      pageNumber: 1,
      isLoading: false,
      page: null,
    };
    ingredientStore.refresh(emptyIngredientState);
    transactionReasonsStore.getReasons();
  }

  export let url = "";
</script>

<NotificationWrapper>
  <main class="m-0 p-0 text-center h-screen">
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
        <Route path="*" component={Home} />
      </div>
    </Router>
  </main>
</NotificationWrapper>

<style>
  main {
    padding: 0;
  }
</style>
