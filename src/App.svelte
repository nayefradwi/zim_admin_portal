<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  import { getTokensFromSession, setAuthHeader } from "./data";
  import { userStore } from "./lib/stores/user";
  import { LOGIN_ROUTE } from "./lib/routes";

  const unsubscribe = userStore.subscribe((user) => {
    if (!user) return navigate("/login");
  });

  onMount(() => {
    const token = getTokensFromSession();
    if (!token) return navigate(LOGIN_ROUTE);
    setAuthHeader(token.accessToken);
    userStore.getUser();
    // TODO: set warehouse header
    // if no warehouse redirect to warehouse select
  });

  onDestroy(unsubscribe);
  export let url = "";
</script>

<main>
  <Router {url}>
    <div>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/warehouse-select" component={WarehouseSelection} />
      <Route path="*" component={Home} />
    </div>
  </Router>
</main>

<style>
  main {
    padding: 0;
  }
</style>
