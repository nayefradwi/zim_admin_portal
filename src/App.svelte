<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Home from "./lib/pages/home/Home.svelte";
  import WarehouseSelection from "./lib/pages/warehouse_selection/WarehouseSelection.svelte";
  import Login from "./lib/pages/login/Login.svelte";
  import Dashboard from "./lib/pages/home/dashboard/Dashboard.svelte";
  import Inventory from "./lib/pages/home/inventory/Inventory.svelte";
  import Products from "./lib/pages/home/products/Products.svelte";
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
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/warehouse-select">Warehouse Select</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/inventory">Inventory</Link>
      <Link to="/products">Products</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/customers">Customers</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/settings">Settings</Link>
    </nav>
    <div>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/warehouse-select" component={WarehouseSelection} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/products" component={Products} />
      <Route path="/orders" component={Home} />
      <Route path="/customers" component={Home} />
      <Route path="/reports" component={Home} />
      <Route path="/settings" component={Home} />
      <Route path="*" component={Home} />
    </div>
  </Router>
</main>
