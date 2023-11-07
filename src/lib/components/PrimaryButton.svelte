<script lang="ts">
    export let label: string;
    export let onClick: () => void | undefined = () => {};
    export let disabled: boolean | undefined = false;
    export let loading: boolean | undefined = false;
    export let colorClass: string | undefined = "primary";
</script>

<button class={colorClass} {disabled} on:click={onClick}>
    {label}
    {#if loading}
        <span class="ml-2">
            <i class="fas fa-spinner fa-spin" />
        </span>
    {/if}
</button>

<style>
    .button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: 500;
    }

    .primary {
        background-color: var(--primary-color);
        color: var(--light-color);
    }

    .primary:hover {
        background-color: var(--primary-hover);
    }
</style>
