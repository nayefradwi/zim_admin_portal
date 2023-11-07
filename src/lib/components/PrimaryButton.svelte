<script lang="ts">
    export let label: string;
    export let onClick: () => void | undefined = () => {};
    export let disabled: boolean | undefined = false;
    export let loading: boolean | undefined = false;
    export let colorClass: string | undefined = "primary";
    export let type: "button" | "submit" | "reset" | null | undefined =
        "button";

    export let size: "m" | "s" | "l" | "xs" | "xl" | undefined = "m";
</script>

<button {type} class="{colorClass} {size}" {disabled} on:click={onClick}>
    <span>{label}</span>
    {#if loading}
        <img src="oval.svg" alt="loading spinner" height="24" width="24" />
    {/if}
</button>

<style>
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
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

    .m {
        border-radius: 0.25rem;
        font-size: 1rem;
    }

    .m img {
        margin-left: 0.5rem;
        height: 16px;
        width: 16px;
    }

    .s {
        border-radius: 0.125rem;
        font-size: 0.875rem;
    }

    .s img {
        margin-left: 0.5rem;
        height: 12px;
        width: 12px;
    }

    .l {
        border-radius: 0.5rem;
        font-size: 1.25rem;
    }

    .l img {
        margin-left: 0.5rem;
        height: 20px;
        width: 20px;
    }

    .xs {
        border-radius: 0.125rem;
        font-size: 0.75rem;
    }

    .xs img {
        margin-left: 0.5rem;
        height: 10px;
        width: 10px;
    }

    .xl {
        border-radius: 0.5rem;
        font-size: 1.5rem;
    }

    .xl img {
        margin-left: 0.5rem;
        height: 24px;
        width: 24px;
    }
</style>
