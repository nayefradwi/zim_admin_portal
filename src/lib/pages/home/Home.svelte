<script lang="ts">
    import { Route, Router } from "svelte-routing";
    import AppNavDrawer from "../../components/AppNavDrawer.svelte";
    import { PRODUCT_DETAILS_ROUTE } from "../../routes";
    import ProductDetails from "../product_details/ProductDetails.svelte";
    let selectedPath: string = window.location.pathname;
</script>

<main class="h-screen overflow-hidden">
    <!-- header -->
    <AppNavDrawer />
</main>
