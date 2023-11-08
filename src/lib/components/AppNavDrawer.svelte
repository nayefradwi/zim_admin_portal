<script lang="ts">
    import { HOME_NAVIGATION } from "./../view_models/appNavItem";
    import type { AppNavItemModel } from "./../view_models/appNavItem";
    import { navigate } from "svelte-routing";

    import AppNavDrawerItem from "./AppNavDrawerItem.svelte";
    export let selectedPath: string;
    const onClick = (item: AppNavItemModel, isSelected: boolean) => {
        if (!isSelected && !item.isLocked) {
            navigate(item.path, { replace: true });
            selectedPath = item.path;
        }
    };
</script>

<div class="nav-drawer">
    {#each HOME_NAVIGATION as item}
        <AppNavDrawerItem
            navItem={item}
            isSelected={selectedPath == item.path}
            {onClick}
        />
    {/each}
</div>

<style>
    .nav-drawer {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        background-color: var(--on-background);
    }
</style>
