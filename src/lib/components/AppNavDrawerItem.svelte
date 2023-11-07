<script lang="ts">
    import type { AppNavItemModel } from "../view_models/appNavItem.ts";
    export let navItem: AppNavItemModel;
    export let isSelected: boolean;
    export let onClick: (item: AppNavItemModel, isSelected: boolean) => void;
</script>

<div class="nav-item nav-item-container">
    <a
        on:click={(e) => {
            e.preventDefault();
            onClick(navItem, isSelected);
        }}
        class="nav-item-content {navItem.isLocked ? 'locked' : ''} {isSelected
            ? 'selected'
            : ''}"
        href={navItem.path}
        >{navItem.name}
    </a>
</div>

<style>
    .nav-item-container {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
    }

    .nav-item {
        color: var(--primary-inverse);
        margin: 8px 16px;
    }

    .nav-item-content {
        text-decoration: none;
        color: var(--primary-inverse);
        padding: 8px;
        width: 100%;
        text-align: left;
        font-weight: 500;
    }

    .nav-item:hover {
        background-color: var(--primary-hover);
    }

    .locked {
        cursor: not-allowed;
    }

    .selected {
        background-color: var(--primary);
    }
</style>
