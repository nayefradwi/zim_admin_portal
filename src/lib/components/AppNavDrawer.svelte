<script lang="ts">
  import { HOME_NAVIGATION } from "./../view_models/appNavItem";
  import type { AppNavItemModel } from "./../view_models/appNavItem";
  import { navigate } from "svelte-routing";
  import { Router, Route } from "svelte-routing";
  import AppNavDrawerItem from "./AppNavDrawerItem.svelte";
  import InventoryView from "../pages/home/inventory/InventoryView.svelte";
  import ProductView from "../pages/home/product/ProductView.svelte";
  import { LogOutIcon } from "svelte-feather-icons";
  import { HOME_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE } from "../routes";
  import { setAuthHeader, storeTokensInSession } from "../../data";
  import { drawerToggle } from "../stores/drawer";
  import AppNavBar from "./AppNavBar.svelte";
  let selectedPath: string = window.location.pathname;
  const onClick = (item: AppNavItemModel, isSelected: boolean) => {
    if (!isSelected && !item.isLocked) {
      navigate(item.path, { replace: true });
      selectedPath = item.path;
    }
  };
  const logoutNavItem: AppNavItemModel = {
    name: "Logout",
    icon: LogOutIcon,
    path: "/logout",
  };

  const logout = () => {
    setAuthHeader("");
    storeTokensInSession({ accessToken: "", refreshToken: "" });
    navigate(LOGIN_ROUTE);
  };
</script>

<div class="drawer {$drawerToggle ? 'drawer-open' : null}">
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
      <AppNavDrawerItem
        navItem={logoutNavItem}
        isSelected={false}
        onClick={logout}
      />
    </ul>
  </div>
  <div class="drawer-content">
    <AppNavBar />
    <Router url={selectedPath}>
      <Route path={HOME_ROUTE} component={InventoryView} />
      <Route path={PRODUCTS_ROUTE} component={ProductView} />
    </Router>
  </div>
</div>
