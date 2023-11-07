<script lang="ts">
  import { onMount } from "svelte";
  import AppNavDrawer from "./lib/components/AppNavDrawer.svelte";

  onMount(() => {
    // get user token
    // get user info
    // if unauthorized redirect to login
    // set warehouse header
    // if no warehouse redirect to warehouse select
    // go to dashboard
  });
</script>

<main>
  <!-- header -->
  <!-- drawer -->
  <AppNavDrawer selectedPath="/" />
  <!-- body -->
</main>

<style>
</style>
