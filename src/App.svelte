<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  onMount(() => {
    // get user token
    // get user info
    // if unauthorized redirect to login
    // set warehouse header
    // if no warehouse redirect to warehouse select
    // go to dashboard
    navigate("/");
  });
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
