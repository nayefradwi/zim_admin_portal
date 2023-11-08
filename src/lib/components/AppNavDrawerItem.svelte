<script lang="ts">
    import type { AppNavItemModel } from "../view_models/appNavItem.ts";
    import type { SvelteComponent } from "svelte";

    export let navItem: AppNavItemModel;
    export let isSelected: boolean;
    export let onClick: (item: AppNavItemModel, isSelected: boolean) => void;
</script>

<li
    class="py-2
    {navItem.isLocked ? 'locked disabled' : null}
    "
>
    <a
        id={isSelected ? "selected" : null}
        class="text-base-100
        {isSelected ? 'active' : null}
        {navItem.isLocked ? 'locked' : null}"
        on:click={(e) => {
            e.preventDefault();
            onClick(navItem, isSelected);
        }}
        href={navItem.path}
    >
        {#if navItem.icon}
            <svelte:component this={navItem.icon} />
        {/if}
        {navItem.name}
    </a>
</li>

<style>
    .locked {
        color: #a0aec0;
    }
    .locked:hover {
        cursor: not-allowed;
    }

    #selected {
        @apply bg-base-100;
        @apply text-primary;
        @apply font-semibold;
    }
    .menu > li :hover {
        @apply text-base-100;
    }
</style>
