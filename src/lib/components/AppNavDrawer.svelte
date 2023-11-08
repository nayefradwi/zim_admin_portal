<script lang="ts">
    import { HOME_NAVIGATION } from "./../view_models/appNavItem";
    import type { AppNavItemModel } from "./../view_models/appNavItem";
    import { navigate } from "svelte-routing";
    import { Router, Route } from "svelte-routing";
    import AppNavDrawerItem from "./AppNavDrawerItem.svelte";
    import Dashboard from "../pages/home/dashboard/Dashboard.svelte";
    import Inventory from "../pages/home/inventory/Inventory.svelte";
    import Product from "../pages/home/product/Product.svelte";
    let selectedPath: string = window.location.pathname;
    const onClick = (item: AppNavItemModel, isSelected: boolean) => {
        if (!isSelected && !item.isLocked) {
            navigate(item.path, { replace: true });
            selectedPath = item.path;
        }
    };
</script>

<div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle invisible" />
    <div class="drawer-side p-0">
        <ul
            class="menu w-40 min-h-full bg-primary
            text-base-content p-0 [&_li>*]:rounded-none"
        >
            {#each HOME_NAVIGATION as item}
                <AppNavDrawerItem
                    navItem={item}
                    isSelected={selectedPath == item.path}
                    {onClick}
                />
            {/each}
        </ul>
    </div>
    <div class="drawer-content">
        <Router url={selectedPath}>
            <Route path="/" component={Dashboard} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/products" component={Product} />
            <!--
                Route path="/orders" component={Home} />
                <Route path="/customers" component={Home} />
                <Route path="/reports" component={Home} />
                <Route path="/settings" component={Home} />
            -->
        </Router>
    </div>
</div>
