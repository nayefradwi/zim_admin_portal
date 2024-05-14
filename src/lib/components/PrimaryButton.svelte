<script lang="ts">
    export let label: string;
    export let onClick: () => void | undefined = () => {};
    export let disabled: boolean | undefined = false;
    export let loading: boolean | undefined = false;
    export let isOutline: boolean | undefined = false;
    export let btnColor: "btn-primary" | "btn-secondary" | undefined =
        "btn-primary";
    export let type: "button" | "submit" | "reset" | null | undefined =
        "button";
    export let size: "btn-sm" | "btn-lg" | "btn-xs" | "" | undefined = "";
</script>

<button
    {type}
    class="btn {btnColor} {size} {isOutline ? 'btn-outline' : null} rounded-md"
    {disabled}
    on:click={onClick}
>
    <span>{label}</span>
    {#if loading}
        <span class="loading loading-spinner" />
    {/if}
</button>
