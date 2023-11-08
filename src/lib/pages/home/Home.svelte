<script lang="ts">
    import { Router, Route } from "svelte-routing";

    import AppNavDrawer from "../../components/AppNavDrawer.svelte";
    import Dashboard from "./dashboard/Dashboard.svelte";
    import Inventory from "./inventory/Inventory.svelte";
    import Product from "./product/Product.svelte";
    let selectedPath = "/dashboard";
</script>

<main>
    <!-- header -->
    <!-- drawer -->
    <Router url={selectedPath}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/products" component={Product} />
        <!--
        Route path="/orders" component={Home} />
        <Route path="/customers" component={Home} />
        <Route path="/reports" component={Home} />
        <Route path="/settings" component={Home} />
     -->
    </Router>
    <AppNavDrawer {selectedPath} />
    <!-- body -->
</main>
