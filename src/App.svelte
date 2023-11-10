<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  import {
    getTokensFromSession,
    setAuthHeader,
    setWarehouseHeader,
  } from "./data";
  import { userStore } from "./lib/stores/user";
  import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    WAREHOUSE_SELECT_ROUTE,
  } from "./lib/routes";
  import { getWarehouseSelected } from "./data/local_storage";

  const unsubscribe = userStore.subscribe((user) => {
    if (!user) return navigate("/login");
  });

  onMount(() => {
    const token = getTokensFromSession();
    if (!token) return navigate(LOGIN_ROUTE);
    setAuthHeader(token.accessToken);
    userStore.getUser();
    const warehouseId = getWarehouseSelected();
    if (!warehouseId) navigate(WAREHOUSE_SELECT_ROUTE);
    setWarehouseHeader(warehouseId);
  });

  onDestroy(unsubscribe);
  export let url = "";
</script>

<main>
  <Router {url}>
    <div>
      <Route path={HOME_ROUTE} component={Home} />
      <Route path={LOGIN_ROUTE} component={Login} />
      <Route path={WAREHOUSE_SELECT_ROUTE} component={WarehouseSelection} />
      <Route path="*" component={Home} />
    </div>
  </Router>
</main>

<style>
  main {
    padding: 0;
  }
</style>
