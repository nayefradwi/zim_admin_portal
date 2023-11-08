<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  import Dashboard from "./lib/pages/home/dashboard/Dashboard.svelte";
  import Inventory from "./lib/pages/home/inventory/Inventory.svelte";
  onMount(() => {
    // get user token
    // get user info
    // if unauthorized redirect to login
    // set warehouse header
    // if no warehouse redirect to warehouse select
    // go to dashboard
    navigate("/login");
  });
  export let url = "";
</script>

<main>
  <Router {url}>
    <div>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/warehouse-select" component={WarehouseSelection} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/orders" component={Home} />
      <Route path="/customers" component={Home} />
      <Route path="/reports" component={Home} />
      <Route path="/settings" component={Home} />
      <Route path="*" component={Home} />
    </div>
  </Router>
</main>

<style>
  main {
    padding: 0;
  }
</style>
